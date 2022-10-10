import { useEffect, useMemo, useState } from 'react'
import { Bar } from '../bar'

import styles from '../styles.module.scss'

import { DropdownOption } from '/assets/models'
import { compoundClassName } from '/common/styleUtils'

type Props = {
  label: string
  options: DropdownOption[]
  defaultOptionIndex: number
  onSelectedOptionChanged: (value: any) => void
  displayOptionsAsGrid?: boolean
  noOptionsMessage?: string
}

export const ListBar = ({
  label,
  options,
  defaultOptionIndex,
  onSelectedOptionChanged,
  displayOptionsAsGrid,
  noOptionsMessage,
}: Props) => {
  const [selectedOptionIndex, setSelectedOptionIndex] =
    useState<number>(defaultOptionIndex)

  useEffect(() => {
    onSelectedOptionChanged(options[selectedOptionIndex]?.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionIndex, onSelectedOptionChanged])

  useEffect(() => {
    const selectedOption = options[selectedOptionIndex]
    if (selectedOption === undefined) {
      setSelectedOptionIndex(0)
    } else if (selectedOption.isDisabled) {
      setSelectedOptionIndex(options.findIndex((o) => !o.isDisabled))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const allOptionsAreDisabled = useMemo(
    () => options.every((o) => o.isDisabled),
    [options]
  )

  return (
    <Bar
      label={label}
      value={options[selectedOptionIndex]?.label || '--'}
      onLeftChevronClicked={() =>
        setSelectedOptionIndex((v) => Math.max(0, v - 1))
      }
      onRightChevronClicked={() =>
        setSelectedOptionIndex((v) => Math.min(options.length - 1, v + 1))
      }
      disableLeftChevron={
        options[selectedOptionIndex - 1]?.isDisabled ||
        selectedOptionIndex === 0
      }
      disableRightChevron={selectedOptionIndex === options.length - 1}
    >
      {allOptionsAreDisabled ? (
        <div className={styles.noOptionsMessage}>
          {noOptionsMessage || 'No options are available.'}
        </div>
      ) : (
        <div
          className={`${styles.dropdown} ${
            displayOptionsAsGrid ? styles.grid : ''
          }`}
        >
          {options.map((o, i) => (
            <div
              key={o.label}
              className={compoundClassName({
                [styles.option]: true,
                [styles.selected]: selectedOptionIndex === i,
                [styles.disabled]: !!o.isDisabled,
              })}
              onClick={
                o.isDisabled ? undefined : () => setSelectedOptionIndex(i)
              }
              onKeyDown={(e) => {
                if (!o.isDisabled && e.key === 'Enter') {
                  setSelectedOptionIndex(i)
                }
              }}
              tabIndex={o.isDisabled ? undefined : 0}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </Bar>
  )
}
