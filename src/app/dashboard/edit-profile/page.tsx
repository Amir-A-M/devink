import ButtonPrimary from '@/shared/ButtonPrimary'
import DemoForm from '@/shared/DemoForm'
import { Field, Fieldset, Label } from '@/shared/fieldset'
import Input from '@/shared/Input'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit profile',
  robots: { index: false, follow: false },
}

const DashboardEditProfile = () => {
  return (
    <DemoForm
      className="max-w-4xl rounded-xl md:border md:p-6"
      successMessage="Profile updated in the demo. Connect this form to your account API to persist it."
      resetLabel="Edit again"
    >
      <Fieldset className="grid gap-6 md:grid-cols-2">
        <Field className="block">
          <Label>First name</Label>
          <Input placeholder="Example Doe" type="text" name="firstName" autoComplete="given-name" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>Last name</Label>
          <Input placeholder="Doe" type="text" name="lastName" autoComplete="family-name" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>Current password</Label>
          <Input
            placeholder="***"
            type="password"
            name="currentPassword"
            autoComplete="current-password"
            className="mt-1"
          />
        </Field>
        <Field className="block">
          <Label>New password</Label>
          <Input type="password" name="newPassword" autoComplete="new-password" className="mt-1" />
        </Field>
        <Field className="block md:col-span-2">
          <Label>Email address</Label>
          <Input type="email" name="email" autoComplete="email" placeholder="example@example.com" className="mt-1" />
        </Field>
        <div className="md:col-span-2">
          <ButtonPrimary type="submit">Update profile</ButtonPrimary>
        </div>
      </Fieldset>
    </DemoForm>
  )
}

export default DashboardEditProfile
