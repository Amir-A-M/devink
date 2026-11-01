import type { ImageProps } from 'next/image'
import type { FC } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

interface Props extends ImageProps {
  containerClassName?: string
}

const NcImage: FC<Props> = ({
  containerClassName = 'relative',
  alt,
  className = 'object-cover size-full',
  sizes = '(max-width: 600px) 100vw, 50vw',
  src,
  ...args
}) => {
  return (
    <div className={clsx('', containerClassName)}>
      {src ? <Image className={className} alt={alt} sizes={sizes} src={src} {...args} /> : null}
    </div>
  )
}

export default NcImage
