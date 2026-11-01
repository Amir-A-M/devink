'use client'

import type { EmblaOptionsType } from 'embla-carousel'
import type { FC } from 'react'

import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { use } from 'react'

import type { TCategory } from '@/libs/data-layer/categories'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import CardCategory1 from '@/components/common/categories/CategoryCards/CardCategory1'
import CardCategory2 from '@/components/common/categories/CategoryCards/CardCategory2'
import CardCategory3 from '@/components/common/categories/CategoryCards/CardCategory3'
import CardCategory4 from '@/components/common/categories/CategoryCards/CardCategory4'
import CardCategory5 from '@/components/common/categories/CategoryCards/CardCategory5'
import HeadingWithArrowBtns from '@/libs/design/HeadingWithArrowBtns'
import { useCarouselArrowButtons } from '@/libs/hooks/use-carousel-arrow-buttons'
import { ThemeContext } from '@/libs/providers/theme-provider'

const defaultEmblaOptions: EmblaOptionsType = {
  slidesToScroll: 'auto',
}

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
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
  emblaOptions = defaultEmblaOptions,
}) => {
  const theme = use(ThemeContext)
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
