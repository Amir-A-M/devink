import { Field, Label } from './fieldset'
import Input from './Input'
import { Link } from './link'

export interface FormField {
  name: string
  label: string
  type: 'email' | 'password' | 'text'
  autoComplete: string
  placeholder?: string
  className?: string
  labelAction?: {
    href: string
    label: string
  }
  error?: string
}

export function FormField({ name, label, type, autoComplete, labelAction, error, ...rest }: FormField) {
  return (
    <Field key={name} className={`block ${'className' in rest ? rest.className : ''}`}>
      <div className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
        <Label>{label}</Label>
        {labelAction && (
          <Link href={labelAction.href} className="text-sm font-medium underline">
            {labelAction.label}
          </Link>
        )}
      </div>
      <Input
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={'placeholder' in rest ? rest.placeholder : undefined}
        className="mt-1"
      />
      <p
        role={error ? 'alert' : undefined}
        className={`overflow-hidden text-sm text-red-600 transition-[min-height,margin-top,opacity] duration-200 ease-out ${
          error ? 'mt-1 min-h-5 opacity-100' : 'mt-0 min-h-0 opacity-0'
        }`}
      >
        {error || ''}
      </p>
    </Field>
  )
}

export type FieldErrors = Record<string, string[]>

interface FieldList {
  fields: FormField[]
  errors: FieldErrors
}

export function FieldList({ fields, errors }: FieldList) {
  return fields.map((item) => {
    const error = errors[item.name]?.[0]
    return <FormField key={item.name} {...item} error={error} />
  })
}
