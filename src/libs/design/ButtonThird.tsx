import React from 'react'

import type { ButtonProps } from '@/libs/design/Button'

import { Button } from '@/libs/design/Button'

const ButtonThird: React.FC<ButtonProps> = ({ color, outline, plain, children, ...props }) => {
  return (
    <Button plain {...props}>
      {children}
    </Button>
  )
}
export default ButtonThird
