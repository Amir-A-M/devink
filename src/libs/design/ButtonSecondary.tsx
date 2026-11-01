import React from 'react'

import type { ButtonProps } from '@/libs/design/Button'

import { Button } from '@/libs/design/Button'

const ButtonSecondary: React.FC<ButtonProps> = ({ color, outline, plain, children, ...props }) => {
  return (
    <Button color="light" {...props}>
      {children}
    </Button>
  )
}

export default ButtonSecondary
