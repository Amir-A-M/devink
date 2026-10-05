import clsx from 'clsx'
import Image, { type ImageProps } from 'next/image'
import { type FC } from 'react'

interface Props extends ImageProps {
  containerClassName?: string
}

const NcImage: FC<Props> = ({
  containerClassName = 'relative',
  alt,
  className = 'object-cover size-full',
  // Callers that render smaller than this must pass their own `sizes`; the
  // default is sized for a half-width card, not for a thumbnail.
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
