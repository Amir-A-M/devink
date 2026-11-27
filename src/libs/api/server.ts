import ky from 'ky'
import { cookies } from 'next/headers'
import 'server-only'

export const serverApi = ky.create({
  prefix: process.env.API_URL,
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = (await cookies()).get('token')?.value
        if (token) request.headers.set('Authorization', `Bearer ${token}`)
        request.headers.set('Accept', 'application/json')
      },
    ],
  },
})
