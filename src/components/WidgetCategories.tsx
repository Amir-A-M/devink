import { type TCategory } from '@/data/categories'
import clsx from 'clsx'
import { type FC } from 'react'
import CardCategory1 from './CategoryCards/CardCategory1'
import WidgetHeading from './WidgetHeading'

interface Props {
  className?: string
  categories: TCategory[]
}

const WidgetCategories: FC<Props> = ({ className = 'bg-neutral-100 dark:bg-neutral-800', categories }) => {
  return (
    <div className={clsx('widget-categories overflow-hidden rounded-3xl', className)}>
      <WidgetHeading title="Suggested categories" viewAll={{ label: 'View all', href: '/#' }} />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {categories?.map((category) => (
            <CardCategory1
              className="p-4 hover:bg-neutral-200 xl:p-5 dark:hover:bg-neutral-700"
              key={category.id}
              category={category}
              size="normal"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WidgetCategories
