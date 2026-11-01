import type { FC } from 'react'

import clsx from 'clsx'

export interface SkeletonProps {
  className?: string
}

const Skeleton: FC<SkeletonProps> = ({ className = '' }) => {
  return <span className={clsx('inline-flex bg-neutral-400', className)}></span>
}

export default Skeleton
