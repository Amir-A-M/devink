import type { FC, SVGProps } from 'react'

import { LoaderCircle } from 'lucide-react'

interface Props extends SVGProps<SVGSVGElement> {
  className?: string
}

const SpinLoading: FC<Props> = ({ className, ...props }) => {
  return <LoaderCircle className={`size-12 animate-spin text-white ${className}`} aria-hidden="true" {...props} />
}

export default SpinLoading
