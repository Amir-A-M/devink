'use client'

import type { FC } from 'react'

import clsx from 'clsx'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import type { TPost } from '@/libs/data-layer/posts'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import CardLarge1 from '@/components/common/posts/PostCards/CardLarge1'
import HeadingWithArrowBtns from '@/libs/design/HeadingWithArrowBtns'

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
  className?: string
  heading?: string
  posts: TPost[]
}

const SectionLargeSlider: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  const [indexActive, setIndexActive] = useState(0)

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= posts.length - 1) {
        return 0
      }
      return state + 1
    })
  }

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return posts.length - 1
      }
      return state - 1
    })
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleClickNext,
    onSwipedRight: handleClickPrev,
    trackMouse: true,
  })

  return (
    <div className={clsx('section-large-slider relative', className)} {...handlers}>
      {!!heading && (
        <HeadingWithArrowBtns subHeading={subHeading} dimHeading={dimHeading}>
          {heading}
        </HeadingWithArrowBtns>
      )}
      {posts.map((item, index) => {
        if (indexActive !== index) return null
        return <CardLarge1 key={index} onClickNext={handleClickNext} onClickPrev={handleClickPrev} post={item} />
      })}
    </div>
  )
}

export default SectionLargeSlider
