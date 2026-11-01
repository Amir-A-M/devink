import { Heart } from 'lucide-react'
import React from 'react'

export interface HeartIconProps {
  containerClassName?: string
  isLiked?: boolean
}
const HeartIcon: React.FC<HeartIconProps> = ({ containerClassName = 'w-5 h-5', isLiked = false }) => {
  return (
    <Heart className={containerClassName} fill={isLiked ? 'currentColor' : 'none'} strokeWidth={1} aria-hidden="true" />
  )
}

export default HeartIcon
