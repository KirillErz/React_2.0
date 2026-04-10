
import { ClickTimer } from 'features/refExamples/ClickTimer'
import { DebouncedLogger } from 'features/refExamples/DebouncedLogger'
import { FocusTracker } from 'features/refExamples/FocusTracker'
import { PreviousInput } from 'features/refExamples/PreviousInput'

export function HomePage() {
  return (
    <main>
      <h1>FSD App</h1>
      <p>Project structure is ready.</p>
      <ClickTimer />
      <PreviousInput />
      <FocusTracker />
      <DebouncedLogger />
    </main>
  )
}
