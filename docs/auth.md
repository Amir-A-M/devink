# Authentication (in progress)

The browser never calls the backend directly. Requests go through a same-origin
proxy (`src/app/api/[...path]/route.ts`), and the token lives only in an
httpOnly cookie, so client JS can't read it and there's no CORS to configure.

```
Browser ──/api/*──▶ Next.js proxy ──Bearer token──▶ Laravel API
   ▲                     │
   └── httpOnly cookie ◀─┘
```

2. The proxy strips `token` from the response and stores it as a cookie.
3. Later requests: the proxy reads the cookie and adds the `Bearer` header.
4. Server components get the user via `getUser()`; a 401 means "not signed in".
5. Client components use `useAuth()` (SWR). `signOut()` logs out, clears the cache and redirects to `/login`.
6. `(auth)/layout.tsx` redirects signed-in users to `/dashboard`.

**Backend contract:** `accounts/auth/{login,register,logout,show}` and
`accounts/profile/private`. Validation errors return 422 with
`{ message, errors: { field: string[] } }`.

**Not done:** password reset, email verification, profile editing.

Code lives in `src/libs/{api,data-layer,hooks}` and `src/components/auth`.
