import { useEffect, useRef } from 'react'
import type { ChangeEvent } from 'react'

export function DebouncedLogger() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      console.log(value)
    }, 1000)
  }

  return <input type='text' name='debounced-logger' placeholder='Печатайте текст...' onChange={handleChange} />
}
