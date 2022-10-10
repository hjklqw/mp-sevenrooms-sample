import { Store } from './models'
import { xDaysAfterDate } from '/common/timeUtils'

function xDaysAfterToday(amount: number) {
  return xDaysAfterDate(new Date(), amount)
}

export const store: Store = {
  id: 'sampleStore',
  name: 'MP Restaurant',
  startTime: {
    hour: 10,
    minute: 30,
  },
  endTime: {
    hour: 23,
    minute: 0,
  },
  maxNumGuests: 8,
  bgColorHex: '#e2d8c2',
  takenTimes: [
    {
      date: new Date(),
      times: [
        { hour: 12, minute: 30 },
        { hour: 13, minute: 45 },
        { hour: 14, minute: 30 },
        { hour: 16, minute: 45 },
        { hour: 18, minute: 30 },
      ],
    },
    {
      date: xDaysAfterToday(1),
      times: [
        { hour: 11, minute: 0 },
        { hour: 11, minute: 45 },
        { hour: 15, minute: 30 },
        { hour: 10, minute: 15 },
      ],
    },
    {
      date: xDaysAfterToday(2),
      times: [
        { hour: 10, minute: 30 },
        { hour: 11, minute: 15 },
        { hour: 12, minute: 0 },
        { hour: 15, minute: 30 },
        { hour: 16, minute: 45 },
      ],
    },
    {
      date: xDaysAfterToday(3),
      times: [
        { hour: 10, minute: 45 },
        { hour: 5, minute: 0 },
        { hour: 6, minute: 15 },
        { hour: 7, minute: 0 },
        { hour: 7, minute: 45 },
        { hour: 8, minute: 45 },
      ],
    },
  ],
}
