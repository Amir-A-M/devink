'use client'

import { ThemeContext } from '@/app/theme-provider'
import Card10 from '@/components/PostCards/Card10'
import Card10V2 from '@/components/PostCards/Card10V2'
import Card11 from '@/components/PostCards/Card11'
import Card4 from '@/components/PostCards/Card4'
import Card7 from '@/components/PostCards/Card7'
import Card9 from '@/components/PostCards/Card9'
import { type TPost } from '@/data/posts'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { type HeadingWithSubProps } from '@/shared/Heading'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'
import clsx from 'clsx'
import { type EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { type FC, useContext } from 'react'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  posts: TPost[]
  postCardName?: 'card4' | 'card7' | 'card9' | 'card10' | 'card10V2' | 'card11'
  emblaOptions?: EmblaOptionsType
}

const SectionSliderPosts: FC<Props> = ({
  heading,
  subHeading,
  dimHeading,
  className,
  posts,
  postCardName = 'card4',
  emblaOptions = {
    slidesToScroll: 'auto',
  },
}) => {
  const theme = useContext(ThemeContext)
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
