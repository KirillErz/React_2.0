
type FieldName = 'username' | 'email' | 'password' | 'confirmPassword'

export type SignUpField = {
  name: FieldName
  label: string
  type: 'text' | 'email' | 'password'
  autoComplete: string
  placeholder: string
}

export const signUpFields: SignUpField[] = [
  {
    name: 'username',
    label: 'Имя пользователя',
    type: 'text',
    autoComplete: 'username',
    placeholder: 'Введите username',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'name@example.com',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Минимум 6 символов',
  },
  {
    name: 'confirmPassword',
    label: 'Подтверждение пароля',
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Повторите пароль',
  },
]
