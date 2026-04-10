import { useRef } from 'react'

interface ClickData {
  startTime: number | null
  clickCount: number
}

export function ClickTimer() {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  })

  function handleClick() {
    const now = Date.now()
    const clickData = clickDataRef.current

    if (clickData.startTime === null) {
      clickData.startTime = now
      clickData.clickCount = 1
      return
    }

    clickData.clickCount += 1
    const elapsedMs = now - clickData.startTime

    console.log(`Time since first click: ${elapsedMs} ms; total clicks: ${clickData.clickCount}`)
  }

  return (
    <button type='button' onClick={handleClick}>
      Click timer
    </button>
  )
}
