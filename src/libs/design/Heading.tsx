import clsx from 'clsx'

type HeadingProps = React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  dimHeading?: string
}

export function Heading({ className, level = 2, dimHeading, children, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

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

      {dimHeading && <span className="text-neutral-400 dark:text-neutral-500">{dimHeading}</span>}
    </Element>
  )
}

export function Subheading({ className, level = 3, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

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
