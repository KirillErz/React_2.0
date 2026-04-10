import { useRef } from 'react'
import type { FocusEvent } from 'react'

interface FocusStats {
  transitionsCount: number
}

export function FocusTracker() {
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const secondInputRef = useRef<HTMLInputElement | null>(null)
  const focusStatsRef = useRef<FocusStats>({
    transitionsCount: 0,
  })

  function handleFocusCapture(event: FocusEvent<HTMLInputElement>) {
    const from = event.relatedTarget
    const to = event.currentTarget

    const isFromFirstToSecond = from === firstInputRef.current && to === secondInputRef.current
    const isFromSecondToFirst = from === secondInputRef.current && to === firstInputRef.current

    if (!isFromFirstToSecond && !isFromSecondToFirst) {
      return
    }

    focusStatsRef.current.transitionsCount += 1
    console.log(`Переходов фокуса между полями: ${focusStatsRef.current.transitionsCount}`)
  }

  function focusFirstInput() {
    firstInputRef.current?.focus()
  }

  return (
    <section>
      <div>
        <input
          ref={firstInputRef}
          name='first-focus-input'
          placeholder='Первое поле'
          onFocusCapture={handleFocusCapture}
        />
      </div>
      <div>
        <input
          ref={secondInputRef}
          name='second-focus-input'
          placeholder='Второе поле'
          onFocusCapture={handleFocusCapture}
        />
      </div>
      <button type='button' onClick={focusFirstInput}>
        Сфокусировать на первом
      </button>
    </section>
  )
}
