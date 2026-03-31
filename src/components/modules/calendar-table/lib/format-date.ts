/**
 * Formats an ISO date string (YYYY-MM-DD) to a localized date string
 * without timezone offset issues.
 */
export function formatDate(
  raw: string,
  locale = "es-CO",
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string {
  const [year, month, day] = raw.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(locale, options);
}