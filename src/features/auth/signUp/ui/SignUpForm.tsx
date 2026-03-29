import { FieldArray, FormikProvider } from 'formik'

import { useSignUpForm } from './useSignUpForm'

import styles from './SignUpForm.module.css'
import { signUpFields } from './config/fields'

export function SignUpForm() {
  const formik = useSignUpForm()
  const socialLinkErrors = formik.errors.socialLinks as Array<string | undefined> | undefined
  const socialLinkTouched = formik.touched.socialLinks as Array<boolean | undefined> | undefined

  return (
    <FormikProvider value={formik}>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.grid}>
          {signUpFields.map((field) => {
            const error =
              (formik.touched[field.name] || formik.submitCount > 0) && formik.errors[field.name]
            const hintId = `${field.name}-hint`
            const errorId = `${field.name}-error`

            return (
              <label key={field.name} className={styles.field}>
                <span className={styles.label}>{field.label}</span>
                <input
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : hintId}
                />
                {error ? (
                  <span id={errorId} className={styles.error}>
                    {error}
                  </span>
                ) : (
                  <span id={hintId} className={styles.hint}>
                    {field.name === 'confirmPassword'
                      ? 'Пароль в этом поле должен совпадать с основным.'
                      : 'Поле обязательно для заполнения.'}
                  </span>
                )}
              </label>
            )
          })}
        </div>

        <FieldArray
          name='socialLinks'
          render={(arrayHelpers) => (
            <section className={styles.linksSection}>
              <div className={styles.linksHeader}>
                <span className={styles.label}>Социальные ссылки</span>
                <button
                  type='button'
                  className={styles.addLinkButton}
                  onClick={() => arrayHelpers.push('s')}
                >
                  Добавить ссылку
                </button>
              </div>

              <div className={styles.linksList}>
                {formik.values.socialLinks.length ? (
                  formik.values.socialLinks.map((linkValue, index) => {
                    const fieldName = `socialLinks.${index}`
                    const error = socialLinkErrors?.[index]
                    const isTouched = Boolean(socialLinkTouched?.[index]) || formik.submitCount > 0
                    const hintId = `social-link-${index}-hint`
                    const errorId = `social-link-${index}-error`

                    return (
                      <div key={fieldName} className={styles.linkRow}>
                        <div className={styles.linkInputWrap}>
                          <input
                            className={`${styles.input} ${isTouched && error ? styles.inputError : ''}`}
                            name={fieldName}
                            type='url'
                            placeholder='https://github.com/username'
                            value={linkValue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            aria-invalid={Boolean(isTouched && error)}
                            aria-describedby={isTouched && error ? errorId : hintId}
                          />
                          {isTouched && error ? (
                            <span id={errorId} className={styles.error}>
                              {error}
                            </span>
                          ) : (
                            <span id={hintId} className={styles.hint}>
                              Можно добавить GitHub, GitVerse или любую соцсеть.
                            </span>
                          )}
                        </div>

                        <button
                          type='button'
                          className={styles.deleteLinkButton}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Удалить
                        </button>
                      </div>
                    )
                  })
                ) : (
                  <p className={styles.hint}>Список ссылок пуст. Добавьте нужные профили.</p>
                )}
              </div>
            </section>
          )}
        />

        <button type='submit' className={styles.submitButton}>
          Зарегистрироваться
        </button>

        {formik.status === 'submitted' ? (
          <div className={styles.success}>
            Форма валидна и готова к подключению API регистрации.
          </div>
        ) : null}
      </form>
    </FormikProvider>
  )
}
