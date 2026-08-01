// -------- weekly recurrence --------
// Given an anchor date (used only for its day-of-week) and a "from" date,
// returns the next occurrence of that weekday on or after "from".
export function getNextWeeklyOccurrence(anchorDate: Date, from: Date): Date {
  const targetDay = anchorDate.getUTCDay();
  const result = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  const currentDay = result.getUTCDay();
  const diff = (targetDay - currentDay + 7) % 7;
  result.setUTCDate(result.getUTCDate() + diff);
  return result;
}

// -------- next occurrence, season-aware --------
// If the event isn't seasonal, or the plain next weekly occurrence already
// falls within season, that's the answer. Otherwise, jump forward to the
// season's start and find the first matching weekday on or after that date.
export function getNextSeasonalOccurrence(
  anchorDate: Date,
  from: Date,
  seasonal: boolean,
  seasonStart?: Date | null,
  seasonEnd?: Date | null
): Date {
  const plainNext = getNextWeeklyOccurrence(anchorDate, from);

  if (!seasonal || !seasonStart || !seasonEnd) {
    return plainNext;
  }

  if (isWithinSeason(plainNext, seasonStart, seasonEnd)) {
    return plainNext;
  }

  // out of season: find the next time the season starts, then the first
  // matching weekday on or after that date
  const startMonth = seasonStart.getUTCMonth();
  const startDay = seasonStart.getUTCDate();

  let candidateSeasonStart = new Date(Date.UTC(from.getUTCFullYear(), startMonth, startDay));
  if (candidateSeasonStart < from) {
    candidateSeasonStart = new Date(Date.UTC(from.getUTCFullYear() + 1, startMonth, startDay));
  }

  return getNextWeeklyOccurrence(anchorDate, candidateSeasonStart);
}

// -------- yearly season window --------
// Compares only month/day, ignoring year, since the season repeats annually.
// Handles seasons that wrap across the new year (e.g. Sept -> May).
function monthDay(d: Date): number {
  return d.getUTCMonth() * 100 + d.getUTCDate();
}

export function isWithinSeason(date: Date, seasonStart: Date, seasonEnd: Date): boolean {
  const target = monthDay(date);
  const start = monthDay(seasonStart);
  const end = monthDay(seasonEnd);

  if (start <= end) {
    // normal range, e.g. March -> June
    return target >= start && target <= end;
  }
  // wraps across year boundary, e.g. September -> May
  return target >= start || target <= end;
}
