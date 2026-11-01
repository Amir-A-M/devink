'use client'

import type { EmblaOptionsType } from 'embla-carousel'
import type { FC } from 'react'

import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { use } from 'react'

import type { TPost } from '@/libs/data-layer/posts'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import Card10 from '@/components/common/posts/PostCards/Card10'
import Card10V2 from '@/components/common/posts/PostCards/Card10V2'
import Card11 from '@/components/common/posts/PostCards/Card11'
import Card4 from '@/components/common/posts/PostCards/Card4'
import Card7 from '@/components/common/posts/PostCards/Card7'
import Card9 from '@/components/common/posts/PostCards/Card9'
import HeadingWithArrowBtns from '@/libs/design/HeadingWithArrowBtns'
import { useCarouselArrowButtons } from '@/libs/hooks/use-carousel-arrow-buttons'
import { ThemeContext } from '@/libs/providers/theme-provider'

const defaultEmblaOptions: EmblaOptionsType = {
  slidesToScroll: 'auto',
}

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
  className?: string
  heading?: string
  posts: TPost[]
  postCardName?: 'card10' | 'card10V2' | 'card11' | 'card4' | 'card7' | 'card9'
  emblaOptions?: EmblaOptionsType
}

const SectionSliderPosts: FC<Props> = ({
  heading,
  subHeading,
  dimHeading,
  className,
  posts,
  postCardName = 'card4',
  emblaOptions = defaultEmblaOptions,
}) => {
  const theme = use(ThemeContext)
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...emblaOptions, direction: theme?.themeDir })
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)

  const renderCard = (item: TPost, index: number) => {
    switch (postCardName) {
      case 'card4':
        return <Card4 key={index} post={item} />
      case 'card7':
        return <Card7 key={index} post={item} />
      case 'card9':
        return <Card9 key={index} post={item} />
      case 'card10':
        return <Card10 key={index} post={item} />
      case 'card10V2':
        return <Card10V2 key={index} post={item} />
      case 'card11':
        return <Card11 key={index} post={item} />

      default:
        return null
    }
  }

  return (
    <div className={clsx('section-slider-posts relative', className)}>
      <HeadingWithArrowBtns
        subHeading={subHeading}
        dimHeading={dimHeading}
        hasNextPrev
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
        onClickPrev={onPrevButtonClick}
        onClickNext={onNextButtonClick}
      >
        {heading}
      </HeadingWithArrowBtns>

      <div className="embla" ref={emblaRef}>
        <div className="-ms-5 embla__container sm:-ms-7">
          {posts.map((post, index) => (
            <div key={post.id} className="embla__slide basis-[86%] ps-5 sm:ps-7 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              {renderCard(post, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionSliderPosts
