import { ParsedUrlQueryInput } from 'querystring'

export type Time = {
  /** Based on a 24-hour clock */
  hour: number
  minute: number
}

export interface Store {
  id: string
  name: string
  startTime: Time
  endTime: Time
  maxNumGuests: number
  bgColorHex: string
  takenTimes: { date: Date; times: Time[] }[]
}

export interface ReservationSearchData {
  date: Date
  numGuests: number
  time: Time
}

export interface ReservationUrlQuery extends ParsedUrlQueryInput {
  date: string
  numGuests: string
  hour: string
  minute: string
}

export interface DropdownOption {
  label: string
  value: any
  isDisabled?: boolean
}
