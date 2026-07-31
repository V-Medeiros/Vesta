export type SessionStatus = 'completed' | 'abandoned';

export type SessionModel = {
  id: string;
  date: string;
  durationMinutes: number;
  taskId: string | null;
  status: SessionStatus;
  startedAt: string;
  endedAt: string;
};
