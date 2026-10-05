import NcImage from '@/components/NcImage/NcImage'
import { type TCategory } from '@/data/categories'
import clsx from 'clsx'
import Link from 'next/link'
import { type FC } from 'react'

interface Props {
  className?: string
  category: TCategory
  size?: 'large' | 'normal'
}

const CardCategory1: FC<Props> = ({ className, size = 'normal', category }) => {
  const { count, name, handle, thumbnail } = category
  return (
    <Link href={`/category/${handle}`} className={clsx('card-category-1 flex items-center', className)}>
      <NcImage
        alt={name}
        containerClassName={clsx(
          'relative me-4 shrink-0 overflow-hidden rounded-lg',
          size === 'large' ? 'size-20' : 'size-12'
        )}
        src={thumbnail || ''}
        fill
        className="object-cover"
        sizes="80px"
      />
      <div>
        <h2
          className={clsx(
            'nc-card-title text-sm font-medium text-neutral-900 sm:text-base sm:font-semibold dark:text-neutral-100',
            size === 'large' ? 'text-lg' : 'text-base'
          )}
        >
          {name}
        </h2>
        <p className={clsx('mt-1 text-neutral-700 dark:text-neutral-400', size === 'large' ? 'text-sm' : 'text-xs')}>
          {count} {count === 1 ? 'article' : 'articles'}
        </p>
      </div>
    </Link>
  )
}

export default CardCategory1
