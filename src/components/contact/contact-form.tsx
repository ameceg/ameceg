'use client'

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  PenLine,
  Phone,
  Send,
  User,
} from 'lucide-react'
import { useState, type ComponentProps, type FormEvent, type ReactNode } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ContactFormValues = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FieldName = keyof ContactFormValues

type FieldErrors = Partial<Record<FieldName, string>>

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const PHONE_PATTERN = /^[+0-9()\-\s]{7,20}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim()

  switch (field) {
    case 'name':
      if (!trimmed) return 'Name is required'
      if (trimmed.length < 2) return 'Name must be at least 2 characters'
      if (trimmed.length > 100) return 'Name must be 100 characters or less'
      return undefined
    case 'email':
      if (!trimmed) return 'Email is required'
      if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address'
      return undefined
    case 'phone':
      if (!trimmed) return undefined
      if (!PHONE_PATTERN.test(trimmed)) return 'Enter a valid phone number'
      return undefined
    case 'subject':
      if (!trimmed) return 'Subject is required'
      if (trimmed.length < 3) return 'Subject must be at least 3 characters'
      if (trimmed.length > 150) return 'Subject must be 150 characters or less'
      return undefined
    case 'message':
      if (!trimmed) return 'Message is required'
      if (trimmed.length < 10) return 'Message must be at least 10 characters'
      if (trimmed.length > 5000) return 'Message must be 5000 characters or less'
      return undefined
  }
}

const inputClasses =
  'h-11 w-full rounded-lg border border-input bg-background px-4 pl-11 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-3 focus:ring-ring/40 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-60'

type FieldIconProps = { className?: string } & ComponentProps<'svg'>

type FieldConfig = {
  name: FieldName
  label: string
  type: 'text' | 'email' | 'tel'
  placeholder: string
  fullWidth?: boolean
  autoComplete?: string
  Icon: (props: FieldIconProps) => ReactNode
  required?: boolean
}

const fields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Your name',
    type: 'text',
    placeholder: 'Jane Doe',
    autoComplete: 'name',
    Icon: User,
    required: true,
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
    Icon: Mail,
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone number',
    type: 'tel',
    placeholder: '+91 00000 00000',
    fullWidth: true,
    autoComplete: 'tel',
    Icon: Phone,
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'What’s this about?',
    fullWidth: true,
    Icon: MessageSquare,
    required: true,
  },
]

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const isSubmitting = status === 'submitting'

  function handleChange(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FieldErrors = {}
    ;(Object.keys(values) as FieldName[]).forEach((field) => {
      const error = validateField(field, values[field])
      if (error) nextErrors[field] = error
    })

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    setServerError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      })

      if (!response.ok) {
        let message = 'Something went wrong while sending your message. Please try again.'
        try {
          const payload = (await response.json()) as { errors?: { message?: string }[] }
          if (payload.errors?.[0]?.message) {
            message = payload.errors[0].message
          }
        } catch {
          // ignore non-JSON error bodies
        }
        throw new Error(message)
      }

      setValues(initialValues)
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setServerError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map(({ name, label, type, placeholder, fullWidth, autoComplete, Icon, required }) => {
          const error = errors[name]
          const id = `contact-${name}`

          return (
            <div key={name} className={fullWidth ? 'sm:col-span-2' : undefined}>
              <div className="mb-2 flex items-baseline justify-between">
                <label
                  htmlFor={id}
                  className="text-sm font-medium text-foreground"
                >
                  {label}
                  {required ? (
                    <span className="ml-1 text-destructive" aria-hidden="true">
                      *
                    </span>
                  ) : null}
                </label>
                {!required ? (
                  <span className="text-xs font-normal text-muted-foreground">optional</span>
                ) : null}
              </div>
              <div className="relative">
                <Icon
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id={id}
                  name={name}
                  type={type}
                  value={values[name]}
                  onChange={(event) => handleChange(name, event.target.value)}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={inputClasses}
                />
              </div>
              {error ? (
                <p
                  id={`${id}-error`}
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-destructive"
                >
                  <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              ) : null}
            </div>
          )
        })}

        <div className="sm:col-span-2">
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              Message
              <span className="ml-1 text-destructive" aria-hidden="true">
                *
              </span>
            </label>
          </div>
          <div className="relative">
            <PenLine
              className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={(event) => handleChange('message', event.target.value)}
              placeholder="Tell us a little about what you’re reaching out about…"
              rows={5}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className={cn(
                inputClasses,
                'h-auto min-h-32 resize-y py-3',
                'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
              )}
            />
          </div>
          {errors.message ? (
            <p
              id="contact-message-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-destructive"
            >
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div aria-live="polite" className="mt-8 flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
            className: 'h-12 w-full gap-2 px-8 font-bold',
          })}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin text-primary-foreground" aria-hidden="true" />
          ) : (
            <Send className="size-4 text-primary-foreground" aria-hidden="true" />
          )}
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </button>

        {status === 'error' ? (
          <p role="alert" className="flex items-center gap-2 text-sm font-medium text-destructive">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {serverError}
          </p>
        ) : null}
      </div>

      {status === 'success' ? (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-muted p-4"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
              Message sent
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Thanks for reaching out — the AME team will get back to you within a couple of
              business days.
            </p>
          </div>
        </div>
      ) : null}
    </form>
  )
}