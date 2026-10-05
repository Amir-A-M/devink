import NcImage from '@/components/NcImage/NcImage'
import { type TCategory } from '@/data/categories'
import { Badge } from '@/shared/Badge'
import { Link } from '@/shared/link'
import clsx from 'clsx'
import { type FC } from 'react'

interface Props {
  className?: string
  category: TCategory
  badge?: string
}

const CardCategory2: FC<Props> = ({ className, category, badge }) => {
  const { count, name, handle, thumbnail } = category
  return (
    <div
      className={clsx(
        `card-category-2 relative flex flex-col items-center justify-center rounded-3xl border border-dashed bg-white px-3 py-5 text-center sm:p-6 dark:bg-neutral-900`,
        className
      )}
    >
      {badge && (
        <Badge color={'amber'} className="absolute -top-2 left-3 sm:top-3">
          {badge}
        </Badge>
      )}
      <NcImage
        containerClassName="relative shrink-0 size-20 "
        src={thumbnail || ''}
        fill
        sizes="80px"
        alt={name}
        className="rounded-full object-cover shadow-lg"
      />
      <div className="mt-3">
        <h2 className={`text-base font-semibold`}>{name}</h2>
        <Link className="absolute inset-0" href={`/category/${handle}`} aria-hidden="true" tabIndex={-1} />
        <span className={`mt-1 block text-sm text-neutral-500 dark:text-neutral-400`}>{count} articles</span>
      </div>
    </div>
  )
}

export default CardCategory2
