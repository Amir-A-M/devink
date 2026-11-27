'use client'

import type { SubmitEvent } from 'react'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import type { FieldErrors, FormField } from '@/libs/design/FormField'

import { getValidationErrors } from '@/libs/api/error'
import { register } from '@/libs/data-layer/auth/client'
import ButtonPrimary from '@/libs/design/ButtonPrimary'
import { FieldList } from '@/libs/design/FormField'
import { getString } from '@/libs/utils/common'
import { tryCatch } from '@/libs/utils/try-catch'

const FIELDS: FormField[] = [
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', placeholder: 'example@example.com' },
  { name: 'username', label: 'Username', type: 'text', autoComplete: 'username', placeholder: 'example' },
  { name: 'full_name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
  {
    name: 'password_confirmation',
    label: 'Password confirmation',
    type: 'password',
    autoComplete: 'new-password',
    className: '-mt-2',
  },
]

export default function SignUpForm() {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const router = useRouter()

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setMessage('')
    setPending(true)

    const fd = new FormData(e.currentTarget)

    const { error } = await tryCatch(
      register({
        username: getString(fd, 'username'),
        full_name: getString(fd, 'full_name'),
        email: getString(fd, 'email'),
        password: getString(fd, 'password'),
        password_confirmation: getString(fd, 'password_confirmation'),
      })
    )

    setPending(false)

    if (error) {
      const validation = getValidationErrors(error)
      if (validation) {
        setErrors(validation.errors)
        return
      }

      setMessage(error.message || 'Something went wrong')
      return
    }

    toast.success('Registered successfully', {
      description:
        'We sent a verification link to your email address. Please check your inbox (and spam folder) to verify your account.',
      duration: 4000,
    })
    router.replace('/dashboard')
  }

  const hasFieldErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
      <FieldList fields={FIELDS} errors={errors} />

      {message && !hasFieldErrors && (
        <p role="alert" className="text-sm text-red-600">
          {message}
        </p>
      )}

      <ButtonPrimary type="submit" disabled={pending}>
        {pending ? 'Creating account…' : 'Continue'}
      </ButtonPrimary>
    </form>
  )
}
