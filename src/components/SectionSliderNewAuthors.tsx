'use client'

import type { EmblaOptionsType } from 'embla-carousel'
import type { FC } from 'react'

import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { use } from 'react'

import type { TAuthor } from '@/data/authors'
import type { HeadingWithSubProps } from '@/shared/Heading'

import { ThemeContext } from '@/app/theme-provider'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'

import CardAuthorBox2 from './CardAuthorBoxs/CardAuthorBox2'

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
