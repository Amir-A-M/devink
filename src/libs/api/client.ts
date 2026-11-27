'use client'

import ky from 'ky'

export const api = ky.create({
  prefix: '/api',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
  },
})
