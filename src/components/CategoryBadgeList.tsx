import { BadgeButton } from '@/shared/Badge'
import clsx from 'clsx'
import { type FC } from 'react'

interface Props {
  className?: string
  itemClass?: string
  categories: {
    name: string
    handle: string
    color: string
  }[]
}

const CategoryBadgeList: FC<Props> = ({ className, itemClass, categories }) => {
  return (
    <div className={clsx('category-badge-list flex flex-wrap gap-x-2 gap-y-1', className)}>
      {categories.map((item, index) => (
        <BadgeButton className={itemClass} key={index} href={`/category/${item.handle}`} color={item.color as any}>
          {item.name}
        </BadgeButton>
      ))}
    </div>
  )
}

export default CategoryBadgeList
