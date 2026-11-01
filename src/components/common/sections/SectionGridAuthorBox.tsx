import type { FC } from 'react'

import clsx from 'clsx'

import type { TAuthor } from '@/libs/data-layer/authors'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import CardAuthorBox from '@/components/common/authors/CardAuthorBoxs/CardAuthorBox'
import HeadingWithSub from '@/libs/design/Heading'

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
  className?: string
  authors: TAuthor[]
  heading?: string
}

const SectionGridAuthorBox: FC<Props> = ({ className = '', authors, heading, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-grid-author-box relative', className)}>
      <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading} isCenter>
        {heading}
      </HeadingWithSub>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
        {authors?.map((author) => (
          <CardAuthorBox key={author.id} author={author} />
        ))}
      </div>
    </div>
  )
}

export default SectionGridAuthorBox
