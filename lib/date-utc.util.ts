export function dateToUTC(date: Date): number {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCDay(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
}
