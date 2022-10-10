import { NextRouter } from 'next/router'
import { useMemo, useState, useCallback } from 'react'

import { HiOutlineChevronLeft } from 'react-icons/hi'

import styles from './styles.module.scss'

import { store } from '/assets/data'
import { formatDate, formatTime, isSameDay } from '/common/timeUtils'
import { getOtherAvailableDates, getOtherTimes } from './utils'
import { TimeData } from './models'
import { ReservationSearchData } from '/assets/models'
import { SelectedTimeSection } from './selectedTimeSection'

type Props = {
  reservationData: ReservationSearchData
  router: NextRouter
}

export const SearchPage = ({ reservationData, router }: Props) => {
  const [newBooking, setNewBooking] = useState<ReservationSearchData>()

  const renderTimes = useCallback(
    (times: TimeData[], date: Date) => {
      return times.map((time, i) => (
        <button
          key={i}
          title={time.isTaken ? 'Taken' : 'Select'}
          className={time.isTaken ? styles.taken : ''}
          onClick={
            time.isTaken
              ? undefined
              : () =>
                  setNewBooking({ ...reservationData, date, time: time.time })
          }
        >
          {formatTime(time.time)}
        </button>
      ))
    },
    [reservationData]
  )

  const otherTimes = useMemo(
    () =>
      renderTimes(
        getOtherTimes(reservationData.time, reservationData.date).filter(
          (time) => !time.isTaken
        ),
        reservationData.date
      ),
    [reservationData, renderTimes]
  )

  const otherDates = useMemo(
    () =>
      getOtherAvailableDates(reservationData.time, reservationData.date).map(
        (date, i) => (
          <div key={i}>
            <span className={styles.date}>{formatDate(date.day)}</span>
            <div className={styles.otherTimes}>
              {renderTimes(date.times, date.day)}
            </div>
          </div>
        )
      ),
    [reservationData, renderTimes]
  )

  return (
    <div className={styles.wrapper} style={{ background: store.bgColorHex }}>
      <div className={styles.widget}>
        <section className={styles.selectedDateTime}>
          <button onClick={() => router.back()}>
            <HiOutlineChevronLeft />
          </button>
          <span>
            {formatDate(reservationData.date)} - {reservationData.numGuests}{' '}
            guest
            {reservationData.numGuests > 1 ? 's' : ''} -{' '}
            {formatTime(reservationData.time)}
          </span>
        </section>

        <section className={styles.instructions}>
          Your selected time at {store.name}
        </section>

        <SelectedTimeSection
          reservationData={reservationData}
          router={router}
          includeDate={false}
        />

        {newBooking && (
          <>
            <section className={styles.instructions}>
              Your new selected time
            </section>
            <SelectedTimeSection
              reservationData={newBooking}
              router={router}
              includeDate={!isSameDay(newBooking.date, reservationData.date)}
            />
          </>
        )}

        <section className={styles.instructions}>
          Other available times on the selected date
        </section>

        <section className={styles.otherTimes}>{otherTimes}</section>

        <section className={styles.instructions}>Other available dates</section>

        <section className={styles.otherDates}>{otherDates}</section>
      </div>
    </div>
  )
}
