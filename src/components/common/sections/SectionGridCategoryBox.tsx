import clsx from 'clsx'

import type { TCategory } from '@/libs/data-layer/categories'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import CardCategory1 from '@/components/common/categories/CategoryCards/CardCategory1'
import CardCategory2 from '@/components/common/categories/CategoryCards/CardCategory2'
import CardCategory3 from '@/components/common/categories/CategoryCards/CardCategory3'
import CardCategory4 from '@/components/common/categories/CategoryCards/CardCategory4'
import CardCategory5 from '@/components/common/categories/CategoryCards/CardCategory5'
import HeadingWithSub from '@/libs/design/Heading'

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'isCenter' | 'subHeading'> {
  categories?: TCategory[]
  heading?: string
  categoryCardType?: 'card1' | 'card2' | 'card3' | 'card4' | 'card5'
  className?: string
}

const SectionGridCategoryBox: React.FC<Props> = ({
  categories,
  categoryCardType = 'card2',
  className,
  subHeading,
  isCenter,
  dimHeading,
  heading,
}) => {
  let CardComponentName = CardCategory2
  switch (categoryCardType) {
    case 'card1':
      CardComponentName = CardCategory1
      break
    case 'card2':
      CardComponentName = CardCategory2
      break
    case 'card3':
      CardComponentName = CardCategory3
      break
    case 'card4':
      CardComponentName = CardCategory4
      break
    case 'card5':
      CardComponentName = CardCategory5
      break

    default:
      CardComponentName = CardCategory2
  }

  return (
    <div className={clsx('section-grid-category-box relative', className)}>
      {heading ? (
        <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading} isCenter={isCenter}>
          {heading}
        </HeadingWithSub>
      ) : null}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
        {categories?.map((item, i) => (
          <CardComponentName badge={i < 3 ? `#${i + 1}` : undefined} key={item.id} category={item} />
        ))}
      </div>
    </div>
  )
}

export default SectionGridCategoryBox
