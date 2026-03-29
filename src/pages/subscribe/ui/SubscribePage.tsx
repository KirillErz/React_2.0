import { SubscriptionWizard } from 'features/subscriptionWizard'

import styles from './SubscribePage.module.css'

export function SubscribePage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <SubscriptionWizard />
      </div>
    </main>
  )
}
