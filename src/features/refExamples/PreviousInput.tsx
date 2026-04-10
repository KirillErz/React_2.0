import { useEffect, useRef, useState } from 'react'

export function PreviousInput() {
  const [value, setValue] = useState('')
  const previousValueRef = useRef('')

  useEffect(() => {
    previousValueRef.current = value
  }, [value])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <>
      <input name='previous-input' value={value} onChange={handleChange} />
      <p>Предыдущее значение: {previousValueRef.current || '—'}</p>
    </>
  )
}
