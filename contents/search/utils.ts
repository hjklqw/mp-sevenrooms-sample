import { TimeData } from './models'
import { store } from '/assets/data'
import { Time } from '/assets/models'
import { generateTimeArray, isSameDay, xDaysAfterDate } from '/common/timeUtils'

function getBookedTakenDay(reservationDate: Date) {
  return store.takenTimes.find((t) => isSameDay(t.date, reservationDate))
}

function areTimesEqual(time1: Time, time2: Time) {
  return time1.hour === time2.hour && time1.minute === time2.minute
}

export function selectedTimeIsAvailable(
  selectedTime: Time,
  selectedDate: Date
) {
  const bookedDay = store.takenTimes.find((t) =>
    isSameDay(t.date, selectedDate)
  )
  if (
    bookedDay?.times.find(
      (t) => t.hour === selectedTime.hour && t.minute === selectedTime.minute
    )
  ) {
    return false
  }
  return true
}

/** Can show this amount of items around a specific time */
const TIME_AROUND_THRESHOLD = 6

/**
 * @returns The other times around the selected time, on the selected date, with availability denoted with `isTaken`
 */
export function getOtherTimes(
  selectedTime: Time,
  selectedDate: Date,
  includeSelectedTime?: boolean
): TimeData[] {
  const bookedDay = getBookedTakenDay(selectedDate)
  const allTimes = generateTimeArray(store.startTime, store.endTime)

  const selectedTimeIndex = allTimes.findIndex((time) =>
    areTimesEqual(time, selectedTime)
  )
  const threshold = includeSelectedTime
    ? TIME_AROUND_THRESHOLD - 1
    : TIME_AROUND_THRESHOLD
  const timesAroundSelected = allTimes.slice(
    Math.max(0, selectedTimeIndex - threshold),
    selectedTimeIndex + threshold
  )

  if (bookedDay === undefined) {
    return timesAroundSelected.map((time) => ({ time, isTaken: false }))
  }

  const filtered = includeSelectedTime
    ? timesAroundSelected
    : timesAroundSelected.filter((time) => !areTimesEqual(time, selectedTime))

  return filtered.map((time) => {
    if (bookedDay.times.some((takenTime) => areTimesEqual(takenTime, time))) {
      return { time, isTaken: true }
    }
    return { time, isTaken: false }
  })
}

const numMilisPerDay = 1000 * 3600 * 24

/**
 * @returns The other available times around the selected time and date
 */
export function getOtherAvailableDates(selectedTime: Time, selectedDate: Date) {
  const today = new Date()

  const numDaysBetweenBookedAndToday = Math.ceil(
    (selectedDate.getTime() - today.getTime()) / numMilisPerDay
  )
  const maxDaysBefore = Math.min(
    Math.max(0, numDaysBetweenBookedAndToday - 1),
    TIME_AROUND_THRESHOLD
  )

  const daysBeforeDate = Array.from({ length: maxDaysBefore }).map((_, i) =>
    xDaysAfterDate(selectedDate, -(i + 1))
  )
  const daysAfterDate = Array.from({ length: TIME_AROUND_THRESHOLD }).map(
    (_, i) => xDaysAfterDate(selectedDate, i + 1)
  )

  const allDays = [...daysBeforeDate, ...daysAfterDate]

  return allDays.map((day) => ({
    day,
    times: getOtherTimes(selectedTime, day, true),
  }))
}

export function isBeforeToday(date: Date) {
  const today = new Date().setHours(0, 0, 0, 0)
  const compareToDate = new Date(date).setHours(0, 0, 0, 0)
  return compareToDate < today
}
