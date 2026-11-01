import type { StaticImageData } from 'next/image'
import type { FC } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import imgAdsDef from '@/images/ads.webp'
import { Link } from '@/shared/link'

interface Props {
  className?: string
  imgAds?: string | StaticImageData
}

const SectionAds: FC<Props> = ({ className, imgAds = imgAdsDef }) => {
  return (
    <Link href="/" className={clsx('section-ads mx-auto block text-center', className)}>
      <span className="text-xs text-neutral-500">- Advertisement -</span>
      <Image className="mx-auto rounded-3xl" src={imgAds} alt="" sizes="(max-width: 1400px) 100vw, 90vw" />
    </Link>
  )
}

export default SectionAds
