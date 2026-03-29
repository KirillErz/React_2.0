import { useActionState } from 'react'

import styles from './SubscriptionWizard.module.css'

type WizardState = {
  step: 1 | 2
  email: string
  error: string | null
  success: string | null
}

const initialState: WizardState = {
  step: 1,
  email: '',
  error: null,
  success: null,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function submitWizard(prevState: WizardState, formData: FormData): Promise<WizardState> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  const intent = String(formData.get('intent') ?? '')
  const rawEmail = formData.get('email')
  const email = typeof rawEmail === 'string' ? rawEmail.trim() : prevState.email

  if (!email) {
    return {
      ...prevState,
      error: 'Email обязателен.',
      success: null,
    }
  }

  if (!emailPattern.test(email)) {
    return {
      ...prevState,
      error: 'Введите корректный email.',
      success: null,
    }
  }

  if (intent === 'next') {
    return {
      step: 2,
      email,
      error: null,
      success: null,
    }
  }

  if (intent === 'confirm') {
    return {
      step: 2,
      email,
      error: null,
      success: `Подписка подтверждена для ${email}.`,
    }
  }

  return prevState
}

export function SubscriptionWizard() {
  const [state, formAction, isPending] = useActionState(submitWizard, initialState)

  return (
    <section className={styles.wizard}>
      <p className={styles.step}>Шаг {state.step} из 2</p>
      <h2 className={styles.title}>Подписка на новости</h2>

      {state.step === 1 ? (
        <>
          <p className={styles.text}>Введите email, чтобы перейти к подтверждению подписки.</p>

          <form className={styles.form} action={formAction} noValidate>
            <label className={styles.label} htmlFor='wizard-email'>
              Email
            </label>
            <input
              id='wizard-email'
              className={styles.input}
              type='email'
              name='email'
              defaultValue={state.email}
              placeholder='name@example.com'
              autoComplete='email'
              disabled={isPending}
            />

            <button className={styles.button} type='submit' name='intent' value='next' disabled={isPending}>
              Продолжить
            </button>
          </form>
        </>
      ) : (
        <>
          <p className={styles.summary}>
            Email для подписки: <strong>{state.email}</strong>
          </p>

          <form className={styles.form} action={formAction}>
            <input type='hidden' name='email' value={state.email} />

            <button
              className={styles.button}
              type='submit'
              name='intent'
              value='confirm'
              disabled={isPending || Boolean(state.success)}
            >
              Подтвердить подписку
            </button>
          </form>
        </>
      )}

      {isPending ? <p className={styles.pending}>Отправка...</p> : null}
      {state.error ? <p className={styles.error}>{state.error}</p> : null}
      {state.success ? <p className={styles.success}>{state.success}</p> : null}
    </section>
  )
}
