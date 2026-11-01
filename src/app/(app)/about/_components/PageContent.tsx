import SectionFounder from '@/app/(app)/about/SectionFounder'
import SectionStatistic from '@/app/(app)/about/SectionStatistic'
import rightImg from '@/assets/about-hero-right.webp'
import DemoForm from '@/components/common/general/DemoForm'
import SectionHero from '@/components/common/sections/SectionHero'
import { Button } from '@/libs/design/Button'
import { Divider } from '@/libs/design/divider'
import Input from '@/libs/design/Input'
import { Link } from '@/libs/design/link'

const PageAbout = () => {
  return (
    <div className={`nc-PageAbout relative`}>
      <h1 className="sr-only">About Devink</h1>
      <div className="relative container space-y-16 py-16 lg:space-y-28 lg:py-28">
        <SectionHero
          rightImg={rightImg}
          heading="About us."
          btnText="Get in touch"
          subHeading="We're impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
        />
        <Divider />
        <SectionFounder />
        <Divider />
        <SectionStatistic />

        <div className="py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:col-span-7 lg:text-5xl">
              Want product news and updates? Sign up for our newsletter.
            </h2>
            <DemoForm
              className="w-full max-w-md lg:col-span-5 lg:pt-2"
              successMessage="You are on the list. This demo stores nothing — connect your mailing provider to make it stick."
              resetLabel="Use a different address"
            >
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                <Button type="submit">Subscribe</Button>
              </div>
              <p className="mt-4 text-sm/6">
                We care about your data. Read our{' '}
                <Link href="/about" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  privacy&nbsp;policy
                </Link>
                .
              </p>
            </DemoForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageAbout
