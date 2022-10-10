import { Time } from '/assets/models'

export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  )
}

const normalDateFormat: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
}

const monthOnlyDateFormat: Intl.DateTimeFormatOptions = {
  month: 'long',
}

export function formatDate(date: Date, showMonthOnly?: boolean) {
  return date.toLocaleDateString(
    'en-US',
    showMonthOnly ? monthOnlyDateFormat : normalDateFormat
  )
}

export function formatTime(time: Time) {
  const d = new Date()
  d.setHours(time.hour)
  d.setMinutes(time.minute)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

const minuteIntervals = [0, 15, 30, 45]

export function generateTimeArray(startTime: Time, endTime: Time) {
  const times: Time[] = []

  const startMinuteIndex = minuteIntervals.findIndex(
    (i) => i === startTime.minute
  )
  const endMinuteIndex = minuteIntervals.findIndex((i) => i === endTime.minute)

  for (let hour = startTime.hour; hour <= endTime.hour; hour++) {
    for (
      let minuteIndex = 0;
      minuteIndex < minuteIntervals.length;
      minuteIndex++
    ) {
      if (hour === startTime.hour && minuteIndex < startMinuteIndex) continue
      if (hour === endTime.hour && minuteIndex > endMinuteIndex) break
      times.push({
        hour,
        minute: minuteIntervals[minuteIndex],
      })
    }
  }

  return times
}

export function xDaysAfterDate(date: Date, numDays: number) {
  const d = new Date()
  d.setDate(date.getDate() + numDays)
  return d
}
