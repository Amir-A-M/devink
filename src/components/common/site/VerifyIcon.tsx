import type { FC } from 'react'

import { BadgeCheck } from 'lucide-react'

interface Props {
  className?: string
  iconClass?: string
}

const VerifyIcon: FC<Props> = ({ className = 'ms-1', iconClass = 'size-5' }) => {
  return (
    <span className={className}>
      <BadgeCheck className={iconClass} aria-hidden="true" />
    </span>
  )
}

export default VerifyIcon
