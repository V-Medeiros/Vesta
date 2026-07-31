import { CountDown } from '../../components/CountDown';
import { FocusFlame } from '../../components/FocusFlame';
import { MainForm } from '../../components/MainForm';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { MainTemplate } from '../../templates/MainTemplate';

const SESSION_LABELS = {
  idle: 'Pronto para focar',
  running: 'Foco em andamento',
  paused: 'Sessão pausada',
  completed: 'Sessão concluída',
  abandoned: 'Sessão encerrada',
} as const;

export function Home() {
  const { ContextState, dismissFeedback } = useTaskContext();

  return (
    <MainTemplate>
      <section className='timer-area' aria-labelledby='session-title'>
        <FocusFlame />
        <h2 className='session-title' id='session-title'>
          {SESSION_LABELS[ContextState.sessionStatus]}
        </h2>
        <CountDown />

        {ContextState.feedbackMessage && (
          <div className='session-feedback' role='status'>
            <span>{ContextState.feedbackMessage}</span>
            <button type='button' onClick={dismissFeedback}>
              Fechar
            </button>
          </div>
        )}

        <MainForm />
      </section>
    </MainTemplate>
  );
}
