import { NextRouter } from 'next/router'

import { BsInfoCircle } from 'react-icons/bs'
import { MdSendToMobile } from 'react-icons/md'

import styles from './styles.module.scss'

import { formatDate, formatTime } from '/common/timeUtils'
import { selectedTimeIsAvailable } from './utils'
import { ReservationSearchData } from '/assets/models'

type Props = {
  reservationData: ReservationSearchData
  includeDate: boolean
  router: NextRouter
}

export const SelectedTimeSection = ({
  reservationData,
  includeDate,
  router,
}: Props) => (
  <section className={styles.timeInfo}>
    {selectedTimeIsAvailable(reservationData.time, reservationData.date) ? (
      <>
        <div>
          <span className={styles.time}>
            <span className={styles.date}>
              {includeDate && formatDate(reservationData.date)}
            </span>
            {formatTime(reservationData.time)}
          </span>
          <span className={styles.category}>A La Carte</span>
          <span className={styles.notes}>
            <BsInfoCircle /> All bookings are for the dining room or patio
            seating. We do not accept bookings for cocktails only and will
            relocate your group to our lounge/bar if space is available.
          </span>
        </div>
        <button onClick={() => router.push('/confirmation')}>
          <MdSendToMobile size="1.3rem" />
          Confirm
        </button>
      </>
    ) : (
      <div>Unfortunately there is no availability at the selected time.</div>
    )}
  </section>
)
