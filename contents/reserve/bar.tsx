import { useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

import styles from './styles.module.scss'

type Props = {
  label: string
  value: string | ((isOpen: boolean) => string)
  children: React.ReactNode
  onLeftChevronClicked: (isOpen: boolean) => void
  onRightChevronClicked: (isOpen: boolean) => void
  disableRightChevron?: boolean
  disableLeftChevron?: boolean
  className?: string
}

export const Bar = ({
  label,
  value,
  children,
  onLeftChevronClicked,
  onRightChevronClicked,
  disableRightChevron,
  disableLeftChevron,
  className,
}: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <div
      className={`${styles.bar} ${isOpen ? styles.open : ''} ${
        className || ''
      }`}
    >
      <div
        className={styles.toggler}
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
      >
        <span className={styles.value}>
          <HiOutlineChevronLeft
            onClick={(e) => {
              if (disableLeftChevron) return
              e.stopPropagation()
              onLeftChevronClicked(isOpen)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onLeftChevronClicked(isOpen)
            }}
            tabIndex={disableLeftChevron ? undefined : 0}
            className={disableLeftChevron ? styles.disabled : ''}
          />
          <span>{typeof value === 'function' ? value(isOpen) : value}</span>
          <HiOutlineChevronRight
            onClick={(e) => {
              if (disableRightChevron) return
              e.stopPropagation()
              onRightChevronClicked(isOpen)
            }}
            onKeyDown={(e) => {
              if (!disableRightChevron && e.key === 'Enter')
                onRightChevronClicked(isOpen)
            }}
            tabIndex={disableRightChevron ? undefined : 0}
            className={disableRightChevron ? styles.disabled : ''}
          />
        </span>
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.contents}>{children}</div>
    </div>
  )
}
