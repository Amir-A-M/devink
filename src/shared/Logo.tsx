import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import logo from '@/images/logo/devink-logo-s.png'

interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: string
}

const Logo: React.FC<Props> = ({ className, size = 'size-12 sm:size-14', ...props }) => {
  return (
    <Link
      href="/"
      aria-label="Devink — home"
      className={clsx('inline-block shrink-0 text-primary-600 dark:text-primary-500', className, size)}
    >
      <Image className="w-full dark:invert" src={logo} alt="Devink logo" width={56} height={56} preload />
    </Link>
  )
}

export default Logo
