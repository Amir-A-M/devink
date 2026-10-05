import clsx from 'clsx'

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6; dimHeading?: string } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

export function Heading({ className, level = 2, dimHeading, children, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(
        className,
        'text-3xl font-semibold tracking-tight text-pretty text-neutral-950 sm:text-4xl dark:text-white'
      )}
    >
      {children}
      {dimHeading && '. '}
      {/* Contrast: neutral-400 on white measures 2.54:1, neutral-500 on
                neutral-900 measures 3.67:1 — both below AA. This is the dimmed half of
                a heading, decorative by design, and the reading is recorded here
                rather than changed. */}
      {dimHeading && <span className="text-neutral-400 dark:text-neutral-500">{dimHeading}</span>}
    </Element>
  )
}

export function Subheading({ className, level = 3, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(className, 'text-lg font-normal text-neutral-500 lg:text-xl dark:text-neutral-400')}
    />
  )
}

export interface HeadingWithSubProps extends HeadingProps {
  subHeading?: string
  children: React.ReactNode
  isCenter?: boolean
}

export default function HeadingWithSub({
  className,
  // Section headings are h2 by default: a page has exactly one h1, and it names
  // the page, not one band of content inside it. Pass level={1} on the one
  // section that IS the page's subject.
  level = 2,
  subHeading,
  children,
  isCenter,
  ...props
}: HeadingWithSubProps) {
  return (
    <div className={clsx(className, 'relative mb-12', isCenter && 'mx-auto w-full text-center text-pretty')}>
      <Heading level={level} {...props}>
        {children}
      </Heading>
      {subHeading && <Subheading className={clsx('mt-3.5 max-w-3xl', isCenter && 'mx-auto')}>{subHeading}</Subheading>}
    </div>
  )
}
