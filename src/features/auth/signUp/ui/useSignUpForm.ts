import { useFormik } from 'formik'
import * as yup from 'yup'

export type SignUpValues = {
  username: string
  email: string
  password: string
  confirmPassword: string
  socialLinks: string[]
}

const initialValues: SignUpValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  socialLinks: [''],
}

const optionalSocialLinkSchema = yup.string().trim().test({
  name: 'social-link-url',
  message: 'Введите корректную ссылку.',
  test: (value) => {
    if (!value) {
      return true
    }

    return yup.string().url().isValidSync(value)
  },
})

const validationSchema = yup.object({
  username: yup.string().trim().required('Введите имя пользователя.'),
  email: yup.string().trim().required('Введите email.').email('Введите корректный email.'),
  password: yup.string().required('Введите пароль.').min(6, 'Пароль должен содержать минимум 6 символов.'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль.')
    .oneOf([yup.ref('password')], 'Пароли не совпадают.'),
  socialLinks: yup.array().of(optionalSocialLinkSchema).required(),
})

export function useSignUpForm() {
  return useFormik<SignUpValues>({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (_values, helpers) => {
      helpers.setStatus('submitted')
    },
  })
}
