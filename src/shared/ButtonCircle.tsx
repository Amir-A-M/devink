import React from 'react'
import { ButtonCircle as ButtonCircleUI, type ButtonProps } from './Button'

const ButtonCircle: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonCircleUI {...props}>{children}</ButtonCircleUI>
}

export default ButtonCircle
