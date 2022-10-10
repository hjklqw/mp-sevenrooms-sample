import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { BiSearch } from 'react-icons/bi'
import styles from './styles.module.scss'

import { store } from '/assets/data'
import { DateBar } from './bars/date'
import { ListBar } from './bars/list'
import { isToday, timeToDropdownOption } from './utils'
import { ReservationSearchData, ReservationUrlQuery } from '/assets/models'
import { generateTimeArray } from '/common/timeUtils'

export const ReservePage = () => {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const guestOptions = Array.from({ length: store.maxNumGuests }).map(
    (_, i) => ({
      label: (i + 1).toString(),
      value: i + 1,
    })
  )
  const defaultGuestOptionIndex = 1

  const timeOptions = generateTimeArray(store.startTime, store.endTime).map(
    (time) => timeToDropdownOption(time, isToday(selectedDate))
  )
  const defaultTimeOptionIndex = (() => {
    const base = timeOptions.findIndex((o) => !o.isDisabled)
    return base === -1 ? 0 : base
  })()

  const data = useRef<ReservationSearchData>({
    date: selectedDate,
    time: timeOptions[defaultTimeOptionIndex].value,
    numGuests: guestOptions[defaultGuestOptionIndex].value,
  })

  return (
    <div className={styles.wrapper} style={{ background: store.bgColorHex }}>
      <div className={styles.widget}>
        <section className={styles.header}>Reservation</section>
        <section className={styles.image}>
          <Image
            src={`/${store.id}/header.jpg`}
            alt={`${store.name} Logo`}
            layout="responsive"
            width={3196}
            height={2028}
          />
        </section>
        <DateBar
          startDate={data.current.date}
          onDateChanged={(date) => {
            data.current.date = date
            setSelectedDate(date)
          }}
        />
        <ListBar
          label="Guests"
          options={guestOptions}
          defaultOptionIndex={defaultGuestOptionIndex}
          onSelectedOptionChanged={(value) => (data.current.numGuests = value)}
        />
        <ListBar
          label="Time"
          options={timeOptions}
          defaultOptionIndex={defaultTimeOptionIndex}
          onSelectedOptionChanged={(value) => (data.current.time = value)}
          displayOptionsAsGrid
          noOptionsMessage="No times are available for the selected day."
        />
        <button
          type="submit"
          onClick={() => {
            router.push({
              pathname: '/search',
              query: {
                date: data.current.date.toJSON(),
                hour: data.current.time.hour.toString(),
                minute: data.current.time.minute.toString(),
                numGuests: data.current.numGuests.toString(),
              } as ReservationUrlQuery,
            })
          }}
        >
          <BiSearch size="1.3em" />
          Search
        </button>
      </div>
    </div>
  )
}
