import { DateTime } from "luxon"

export function getDateLocaleString(dateString: string) {
  return DateTime.fromISO(dateString).toLocaleString(DateTime.DATE_SHORT)
}

export function getFullDateTimeLocaleString(dateString: string) {
  return DateTime.fromISO(dateString).toLocaleString(DateTime.DATETIME_SHORT)
}