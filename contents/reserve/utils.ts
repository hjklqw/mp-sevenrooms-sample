import { DropdownOption, Time } from '/assets/models'
import { formatTime, isSameDay } from '/common/timeUtils'

const minutes15InMs = 1000 * 60 * 15

export function timeToDropdownOption(
  time: Time,
  dateIsToday: boolean
): DropdownOption {
  const today = new Date()
  const currDateToNearest15Minutes = new Date(
    Math.ceil(today.getTime() / minutes15InMs) * minutes15InMs
  )
  const isDisabled = (() => {
    if (!dateIsToday) {
      return false
    }
    if (currDateToNearest15Minutes.getDate() > today.getDate()) {
      return true
    }
    if (time.hour < currDateToNearest15Minutes.getHours()) {
      return true
    } else if (
      time.hour === currDateToNearest15Minutes.getHours() &&
      time.minute < currDateToNearest15Minutes.getMinutes()
    ) {
      return true
    }
    return false
  })()

  const label = formatTime(time)

  return {
    label,
    isDisabled,
    value: time,
  }
}

export function isToday(date: Date) {
  return isSameDay(date, new Date())
}
