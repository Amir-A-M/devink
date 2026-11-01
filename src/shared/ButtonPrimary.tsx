import React from 'react'

import type { ButtonProps } from './Button'

import { Button } from './Button'

const ButtonPrimary: React.FC<ButtonProps> = ({ color, outline, plain, children, ...props }) => {
  return (
    <Button color="dark/white" {...props}>
      {children}
    </Button>
  )
}

export default ButtonPrimary
