'use client'

import { ThemeContext } from '@/app/theme-provider'
import { type TCategory } from '@/data/categories'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { type HeadingWithSubProps } from '@/shared/Heading'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'
import clsx from 'clsx'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { type FC, useContext } from 'react'
import CardCategory1 from './CategoryCards/CardCategory1'
import CardCategory2 from './CategoryCards/CardCategory2'
import CardCategory3 from './CategoryCards/CardCategory3'
import CardCategory4 from './CategoryCards/CardCategory4'
import CardCategory5 from './CategoryCards/CardCategory5'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  categories: TCategory[]
  categoryCardType?: 'card1' | 'card2' | 'card3' | 'card4' | 'card5'
  emblaOptions?: EmblaOptionsType
}

const SectionSliderNewCategories: FC<Props> = ({
  heading,
  subHeading,
  dimHeading,
  className,
  categories,
  categoryCardType = 'card3',
  emblaOptions = {
    slidesToScroll: 'auto',
  },
}) => {
  const theme = useContext(ThemeContext)
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...emblaOptions, direction: theme?.themeDir })
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)

  const renderCard = (item: TCategory, index: number) => {
    const topIndex = index < 3 ? `#${index + 1}` : undefined
    switch (categoryCardType) {
      case 'card1':
        return <CardCategory1 key={index} category={item} />
      case 'card2':
        return <CardCategory2 key={index} badge={topIndex} category={item} />
      case 'card3':
        return <CardCategory3 key={index} category={item} />
      case 'card4':
        return <CardCategory4 key={index} badge={topIndex} category={item} />
      case 'card5':
        return <CardCategory5 key={index} category={item} />
      default:
        return null
    }
  }

  return (
    <div className={clsx('section-slider-new-categories relative', className)}>
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
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="embla__slide basis-[86%] ps-5 sm:basis-1/2 sm:ps-7 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              {renderCard(category, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionSliderNewCategories
