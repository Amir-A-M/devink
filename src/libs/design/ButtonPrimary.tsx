import React from 'react'

import type { ButtonProps } from '@/libs/design/Button'

import { Button } from '@/libs/design/Button'

const ButtonPrimary: React.FC<ButtonProps> = ({ color, outline, plain, children, ...props }) => {
  return (
    <Button color="dark/white" {...props}>
      {children}
    </Button>
  )
}

export default ButtonPrimary
