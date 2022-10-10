import DatePicker from 'react-datepicker'
import { useEffect, useState, useRef } from 'react'

import styles from '../styles.module.scss'

import { Bar } from '../bar'
import { isToday } from '../utils'
import { formatDate, xDaysAfterDate } from '/common/timeUtils'

type Props = {
  startDate: Date
  onDateChanged: (date: Date) => void
}

export const DateBar = ({ onDateChanged, ...props }: Props) => {
  const [startDate, setStartDate] = useState(props.startDate)
  const today = useRef(new Date())

  function addOrSubtractDay(amount: number) {
    return xDaysAfterDate(startDate, amount)
  }

  function addOrSubtractMonth(amount: number) {
    const date = new Date()
    date.setMonth(startDate.getMonth() + amount)
    return date
  }

  useEffect(() => {
    onDateChanged(startDate)
  }, [startDate, onDateChanged])

  return (
    <Bar
      label="Date"
      value={(isOpen) => formatDate(startDate, isOpen)}
      onLeftChevronClicked={(isOpen) =>
        setStartDate(isOpen ? addOrSubtractMonth(-1) : addOrSubtractDay(-1))
      }
      onRightChevronClicked={(isOpen) =>
        setStartDate(isOpen ? addOrSubtractMonth(1) : addOrSubtractDay(1))
      }
      disableLeftChevron={isToday(startDate)}
      className={styles.dateBar}
    >
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        minDate={today.current}
        inline
      />
    </Bar>
  )
}
