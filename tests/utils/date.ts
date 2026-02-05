export function toDateInputValue(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toDateInputValue(d);
}
