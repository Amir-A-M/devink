import ButtonPrimary from '@/shared/ButtonPrimary'
import DemoForm from '@/shared/DemoForm'
import { Field, Fieldset, Label } from '@/shared/fieldset'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Billing address',
  robots: { index: false, follow: false },
}

const page = () => {
  return (
    <DemoForm
      className="max-w-4xl rounded-xl md:border md:p-6"
      successMessage="Billing address saved in the demo. Connect this form to your billing provider to persist it."
      resetLabel="Edit again"
    >
      <Fieldset className="grid gap-6 md:grid-cols-2">
        <Field className="block">
          <Label>Country</Label>
          <Select className="mt-1" name="country" autoComplete="country-name">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>VietNam</option>
            <option>Japan</option>
          </Select>
        </Field>
        <Field className="block">
          <Label>State/Province/Region *</Label>

          <Select className="mt-1" name="region" autoComplete="address-level1">
            <option value="ha'apai">{`Ha'apai`}</option>
            <option value="tongatapu">Tongatapu</option>
            <option value="vava'u">{`Vava'u`}</option>
          </Select>
        </Field>
        <Field className="block">
          <Label>Address Line 1 *</Label>

          <Input type="text" name="addressLine1" autoComplete="address-line1" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>Address Line 2</Label>

          <Input type="text" name="addressLine2" autoComplete="address-line2" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>City *</Label>

          <Input type="text" name="city" autoComplete="address-level2" className="mt-1" />
        </Field>
        <Field className="block">
          <Label>Postal/ZIP Code *</Label>

          <Input type="text" name="postalCode" autoComplete="postal-code" className="mt-1" />
        </Field>
        <div className="md:col-span-2">
          <ButtonPrimary type="submit">Update Billing address</ButtonPrimary>
        </div>
      </Fieldset>
    </DemoForm>
  )
}

export default page
