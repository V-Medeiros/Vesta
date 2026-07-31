export type FlameLevel = {
  level: 1 | 2 | 3 | 4 | 5;
  name: 'Spark' | 'Kindling' | 'Flame' | 'Torch' | 'Bonfire';
};

export function getFlameLevel(streak: number): FlameLevel {
  if (streak >= 21) return { level: 5, name: 'Bonfire' };
  if (streak >= 8) return { level: 4, name: 'Torch' };
  if (streak >= 4) return { level: 3, name: 'Flame' };
  if (streak >= 1) return { level: 2, name: 'Kindling' };
  return { level: 1, name: 'Spark' };
}
