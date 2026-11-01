import React from 'react'

import type { ButtonProps } from './Button'

import { ButtonCircle as ButtonCircleUI } from './Button'

const ButtonCircle: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonCircleUI {...props}>{children}</ButtonCircleUI>
}

export default ButtonCircle
