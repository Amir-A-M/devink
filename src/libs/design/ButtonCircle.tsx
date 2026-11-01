import React from 'react'

import type { ButtonProps } from '@/libs/design/Button'

import { ButtonCircle as ButtonCircleUI } from '@/libs/design/Button'

const ButtonCircle: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonCircleUI {...props}>{children}</ButtonCircleUI>
}

export default ButtonCircle
