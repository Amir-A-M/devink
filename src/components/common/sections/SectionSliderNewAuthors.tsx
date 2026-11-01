'use client'

import type { EmblaOptionsType } from 'embla-carousel'
import type { FC } from 'react'

import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { use } from 'react'

import type { TAuthor } from '@/libs/data-layer/authors'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import CardAuthorBox2 from '@/components/common/authors/CardAuthorBoxs/CardAuthorBox2'
import HeadingWithArrowBtns from '@/libs/design/HeadingWithArrowBtns'
import { useCarouselArrowButtons } from '@/libs/hooks/use-carousel-arrow-buttons'
import { ThemeContext } from '@/libs/providers/theme-provider'

const defaultEmblaOptions: EmblaOptionsType = {
  slidesToScroll: 'auto',
}

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
  className?: string
  heading?: string
  authors: TAuthor[]
  emblaOptions?: EmblaOptionsType
}

const SectionSliderNewAuthors: FC<Props> = ({
  className,
  subHeading,
  dimHeading,
  authors,
  heading,
  emblaOptions = defaultEmblaOptions,
}) => {
  const theme = use(ThemeContext)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...emblaOptions,
    direction: theme?.themeDir,
  })
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)

  return (
    <div className={clsx('section-slider-new-authors relative', className)}>
      <HeadingWithArrowBtns
        hasNextPrev
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
        onClickPrev={onPrevButtonClick}
        onClickNext={onNextButtonClick}
        subHeading={subHeading}
        dimHeading={dimHeading}
      >
        {heading}
      </HeadingWithArrowBtns>

      <div className="embla" ref={emblaRef}>
        <div className="-ms-5 embla__container sm:-ms-7">
          {authors.map((author) => (
            <div
              key={author.id}
              className="embla__slide basis-[86%] ps-5 sm:basis-1/2 sm:ps-7 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <CardAuthorBox2 author={author} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionSliderNewAuthors
