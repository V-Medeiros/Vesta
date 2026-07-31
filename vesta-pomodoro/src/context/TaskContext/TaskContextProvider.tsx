import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SessionModel } from '../../Models/SessionModel';
import type { SettingsModel, StreakModel } from '../../Models/TaskStateModel';
import type { TaskModel } from '../../Models/TaskModel';
import { differenceInCalendarDays, toLocalDateKey } from '../../utils/date';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { STORAGE_KEYS, writeStorage } from '../../utils/storage';
import { TaskContext } from './TaskContext';
import { createInitialTaskState } from './initialTaskState';

type TaskContextProviderProps = {
  children: ReactNode;
};

const COMPLETION_MESSAGE =
  'Sessão concluída. A chama está mais forte — preserve esse ritmo.';
const ABANDONED_MESSAGE =
  'Sessão encerrada. A chama continua aqui para quando você voltar.';

function createId(prefix: string) {
  const randomId =
    typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}_${randomId}`;
}

function updateStreak(streak: StreakModel, sessionDate: string): StreakModel {
  if (streak.lastSessionDate === sessionDate) return streak;

  const isConsecutiveDay =
    streak.lastSessionDate !== null &&
    differenceInCalendarDays(streak.lastSessionDate, sessionDate) === 1;
  const current = isConsecutiveDay ? streak.current + 1 : 1;

  return {
    current,
    lastSessionDate: sessionDate,
    longestEver: Math.max(streak.longestEver, current),
  };
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [ContextState, SetState] = useState(createInitialTaskState);

  const completeSession = useCallback(() => {
    SetState((state) => {
      const activeSession = state.activeSession;
      if (!activeSession || activeSession.status !== 'running') return state;

      const endedAt = new Date().toISOString();
      const date = toLocalDateKey(endedAt);
      const session: SessionModel = {
        id: activeSession.id,
        date,
        durationMinutes: activeSession.durationMinutes,
        taskId: activeSession.taskId,
        status: 'completed',
        startedAt: activeSession.startedAt,
        endedAt,
      };

      return {
        ...state,
        activeSession: null,
        sessionStatus: 'completed',
        secondsRemaining: 0,
        sessions: [...state.sessions, session],
        streak: updateStreak(state.streak, date),
        tasks: state.tasks.map((task) =>
          task.id === activeSession.taskId
            ? {
                ...task,
                sessionsCount: task.sessionsCount + 1,
                updatedAt: endedAt,
              }
            : task,
        ),
        feedbackMessage: COMPLETION_MESSAGE,
      };
    });
  }, []);

  useEffect(() => {
    if (
      ContextState.sessionStatus !== 'running' ||
      !ContextState.activeSession?.endsAt
    ) {
      return;
    }

    const endsAt = ContextState.activeSession.endsAt;
    const intervalId = window.setInterval(() => {
      const secondsRemaining = Math.max(
        0,
        Math.ceil((endsAt - Date.now()) / 1000),
      );

      if (secondsRemaining === 0) {
        window.clearInterval(intervalId);
        completeSession();
        return;
      }

      SetState((state) =>
        state.secondsRemaining === secondsRemaining
          ? state
          : {
              ...state,
              secondsRemaining,
            },
      );
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [
    ContextState.activeSession?.endsAt,
    ContextState.sessionStatus,
    completeSession,
  ]);

  useEffect(() => {
    document.title = `${formatSecondsToMinutes(
      ContextState.secondsRemaining,
    )} · Vesta`;
  }, [ContextState.secondsRemaining]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.tasks, ContextState.tasks);
    writeStorage(STORAGE_KEYS.sessions, ContextState.sessions);
    writeStorage(STORAGE_KEYS.streak, ContextState.streak);
    writeStorage(STORAGE_KEYS.settings, ContextState.settings);
    writeStorage(STORAGE_KEYS.activeSession, ContextState.activeSession);
  }, [
    ContextState.activeSession,
    ContextState.sessions,
    ContextState.settings,
    ContextState.streak,
    ContextState.tasks,
  ]);

  const setDuration = useCallback((minutes: number) => {
    const nextDuration = Math.min(120, Math.max(5, Math.round(minutes)));

    SetState((state) => {
      if (state.sessionStatus === 'running' || state.sessionStatus === 'paused') {
        return state;
      }

      return {
        ...state,
        durationMinutes: nextDuration,
        secondsRemaining: nextDuration * 60,
        sessionStatus: 'idle',
        feedbackMessage: null,
      };
    });
  }, []);

  const startSession = useCallback(() => {
    SetState((state) => {
      if (state.sessionStatus === 'running' || state.sessionStatus === 'paused') {
        return state;
      }

      const now = Date.now();
      const durationInSeconds = state.durationMinutes * 60;

      return {
        ...state,
        activeSession: {
          id: createId('session'),
          durationMinutes: state.durationMinutes,
          taskId: state.selectedTaskId,
          status: 'running',
          startedAt: new Date(now).toISOString(),
          endsAt: now + durationInSeconds * 1000,
          pausedSecondsRemaining: null,
        },
        sessionStatus: 'running',
        secondsRemaining: durationInSeconds,
        feedbackMessage: null,
      };
    });
  }, []);

  const pauseSession = useCallback(() => {
    SetState((state) => {
      if (
        state.sessionStatus !== 'running' ||
        !state.activeSession?.endsAt
      ) {
        return state;
      }

      const secondsRemaining = Math.max(
        1,
        Math.ceil((state.activeSession.endsAt - Date.now()) / 1000),
      );

      return {
        ...state,
        activeSession: {
          ...state.activeSession,
          status: 'paused',
          endsAt: null,
          pausedSecondsRemaining: secondsRemaining,
        },
        sessionStatus: 'paused',
        secondsRemaining,
      };
    });
  }, []);

  const resumeSession = useCallback(() => {
    SetState((state) => {
      if (
        state.sessionStatus !== 'paused' ||
        !state.activeSession ||
        state.secondsRemaining <= 0
      ) {
        return state;
      }

      return {
        ...state,
        activeSession: {
          ...state.activeSession,
          status: 'running',
          endsAt: Date.now() + state.secondsRemaining * 1000,
          pausedSecondsRemaining: null,
        },
        sessionStatus: 'running',
      };
    });
  }, []);

  const abandonSession = useCallback(() => {
    SetState((state) => {
      if (!state.activeSession) return state;

      const endedAt = new Date().toISOString();
      const abandonedSession: SessionModel = {
        id: state.activeSession.id,
        date: toLocalDateKey(endedAt),
        durationMinutes: state.activeSession.durationMinutes,
        taskId: state.activeSession.taskId,
        status: 'abandoned',
        startedAt: state.activeSession.startedAt,
        endedAt,
      };

      return {
        ...state,
        activeSession: null,
        sessionStatus: 'abandoned',
        secondsRemaining: state.durationMinutes * 60,
        sessions: [...state.sessions, abandonedSession],
        feedbackMessage: ABANDONED_MESSAGE,
      };
    });
  }, []);

  const dismissFeedback = useCallback(() => {
    SetState((state) => ({
      ...state,
      sessionStatus:
        state.sessionStatus === 'completed' ||
        state.sessionStatus === 'abandoned'
          ? 'idle'
          : state.sessionStatus,
      secondsRemaining:
        state.sessionStatus === 'completed'
          ? state.durationMinutes * 60
          : state.secondsRemaining,
      feedbackMessage: null,
    }));
  }, []);

  const addTask = useCallback((text: string) => {
    const normalizedText = text.trim();
    if (!normalizedText) return '';

    const now = new Date().toISOString();
    const task: TaskModel = {
      id: createId('task'),
      text: normalizedText,
      completed: false,
      sessionsCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    SetState((state) => ({
      ...state,
      tasks: [task, ...state.tasks],
      selectedTaskId: task.id,
    }));

    return task.id;
  }, []);

  const selectTask = useCallback((taskId: string | null) => {
    SetState((state) => {
      if (state.sessionStatus === 'running' || state.sessionStatus === 'paused') {
        return state;
      }

      const taskExists =
        taskId === null ||
        state.tasks.some((task) => task.id === taskId && !task.completed);

      return taskExists ? { ...state, selectedTaskId: taskId } : state;
    });
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    const updatedAt = new Date().toISOString();
    SetState((state) => ({
      ...state,
      selectedTaskId:
        state.selectedTaskId === taskId ? null : state.selectedTaskId,
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt }
          : task,
      ),
    }));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    SetState((state) => ({
      ...state,
      selectedTaskId:
        state.selectedTaskId === taskId ? null : state.selectedTaskId,
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  }, []);

  const updateSettings = useCallback((settings: Partial<SettingsModel>) => {
    SetState((state) => {
      const nextSettings = { ...state.settings, ...settings };
      const canUpdateTimer =
        state.sessionStatus !== 'running' && state.sessionStatus !== 'paused';

      return {
        ...state,
        settings: nextSettings,
        durationMinutes: canUpdateTimer
          ? nextSettings.defaultDuration
          : state.durationMinutes,
        secondsRemaining: canUpdateTimer
          ? nextSettings.defaultDuration * 60
          : state.secondsRemaining,
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      ContextState,
      setDuration,
      startSession,
      pauseSession,
      resumeSession,
      abandonSession,
      dismissFeedback,
      addTask,
      selectTask,
      toggleTask,
      deleteTask,
      updateSettings,
    }),
    [
      ContextState,
      abandonSession,
      addTask,
      deleteTask,
      dismissFeedback,
      pauseSession,
      resumeSession,
      selectTask,
      setDuration,
      startSession,
      toggleTask,
      updateSettings,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
