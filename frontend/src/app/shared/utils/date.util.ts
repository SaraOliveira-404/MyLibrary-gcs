export function formatDate(date: string | null | undefined): string {
  if (!date) {
    return '-';
  }

  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

export function daysRemaining(date: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(`${date}T00:00:00`);
  const diff = target.getTime() - today.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
