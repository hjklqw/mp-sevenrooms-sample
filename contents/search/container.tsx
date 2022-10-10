import { useRouter } from 'next/router'
import { isBeforeToday } from './utils'

import { SearchPage } from './view'
import { store } from '/assets/data'
import { ReservationSearchData, ReservationUrlQuery } from '/assets/models'

export const SearchPageContainer = () => {
  const router = useRouter()

  const reservationData: ReservationSearchData | undefined = (() => {
    const data = router.query as ReservationUrlQuery
    try {
      const parsed = {
        date: new Date(data.date),
        numGuests: parseInt(data.numGuests),
        time: {
          hour: parseInt(data.hour),
          minute: parseInt(data.minute),
        },
      }
      if (parsed.numGuests > store.maxNumGuests) {
        return undefined
      }
      
      if (isBeforeToday(parsed.date)) {
        return undefined
      }
      if (
        parsed.time.hour < store.startTime.hour ||
        (parsed.time.hour === store.startTime.hour &&
          parsed.time.minute < store.startTime.minute)
      ) {
        return undefined
      }
      if (
        parsed.time.hour > store.endTime.hour ||
        (parsed.time.hour === store.endTime.hour &&
          parsed.time.minute > store.endTime.minute)
      ) {
        return undefined
      }
      return parsed
    } catch (_e) {
      return undefined
    }
  })()

  if (reservationData === undefined) {
    router.push('/')
    return null
  }

  return <SearchPage reservationData={reservationData} router={router} />
}
