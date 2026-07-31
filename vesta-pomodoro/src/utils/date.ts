const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function toLocalDateKey(date: Date | string | number = new Date()) {
  const value = date instanceof Date ? date : new Date(date);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function differenceInCalendarDays(from: string, to: string) {
  const fromMatch = DATE_KEY_PATTERN.exec(from);
  const toMatch = DATE_KEY_PATTERN.exec(to);

  if (!fromMatch || !toMatch) return Number.POSITIVE_INFINITY;

  const fromUtc = Date.UTC(
    Number(fromMatch[1]),
    Number(fromMatch[2]) - 1,
    Number(fromMatch[3]),
  );
  const toUtc = Date.UTC(
    Number(toMatch[1]),
    Number(toMatch[2]) - 1,
    Number(toMatch[3]),
  );

  return Math.round((toUtc - fromUtc) / 86_400_000);
}

export function getRecentDateKeys(total: number, endDate = new Date()) {
  return Array.from({ length: total }, (_, index) => {
    const date = new Date(endDate);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (total - 1 - index));
    return toLocalDateKey(date);
  });
}

export function formatDateLabel(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(year, month - 1, day, 12));
}
