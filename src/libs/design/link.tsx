'use client'

import type { LinkProps } from 'next/link'
import type React from 'react'

import * as Headless from '@headlessui/react'
import NextLink from 'next/link'

export function Link({ ref, ...props }: LinkProps & React.ComponentPropsWithRef<'a'>) {
  const closeHeadless = Headless.useClose()

  return (
    <Headless.DataInteractive>
      <NextLink
        {...props}
        ref={ref}
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(e)
          }
          closeHeadless()
        }}
      />
    </Headless.DataInteractive>
  )
}
