export type FlameLevel = {
  level: 1 | 2 | 3 | 4 | 5;
  name: 'Faísca' | 'Broto' | 'Chama' | 'Tocha' | 'Fogueira';
};

export function getFlameLevel(streak: number): FlameLevel {
  if (streak >= 21) return { level: 5, name: 'Fogueira' };
  if (streak >= 8) return { level: 4, name: 'Tocha' };
  if (streak >= 4) return { level: 3, name: 'Chama' };
  if (streak >= 1) return { level: 2, name: 'Broto' };
  return { level: 1, name: 'Faísca' };
}
