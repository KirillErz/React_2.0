import { SignUpForm } from 'features/auth/signUp'

import styles from './RegisterPage.module.css'

export function RegisterPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <span className={styles.eyebrow}>Registration</span>
        <p className={styles.description}>
          Заполните форму, чтобы зарегистрировать нового пользователя.
        </p>
        <SignUpForm />
      </section>
    </main>
  )
}
