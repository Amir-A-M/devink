'use client'

import type { FC } from 'react'

import { PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { Button } from '@/libs/design/Button'

interface Props {
  following?: boolean
  className?: string
}

const FollowButton: FC<Props> = ({ className, following }) => {
  const [isFollowing, setIsFollowing] = useState(following)

  return !isFollowing ? (
    <Button outline className={className} onClick={() => setIsFollowing(true)}>
      <PlusIcon className="size-5" />
      Follow
    </Button>
  ) : (
    <Button outline className={className} onClick={() => setIsFollowing(false)}>
      Following
    </Button>
  )
}

export default FollowButton
