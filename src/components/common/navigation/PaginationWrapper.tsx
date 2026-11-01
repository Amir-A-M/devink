'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback } from 'react'

import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/libs/design/Pagination'

interface Props {
  totalPages?: number
  className?: string
}

function PaginationComponent({ totalPages = 10, className }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const currentPage = 2

  return (
    <Pagination className={className}>
      <PaginationPrevious
        href={currentPage > 1 ? `${pathname}?${createQueryString('page', (currentPage - 1).toString())}` : null}
      />
      <PaginationList>
        <PaginationPage href={`${pathname}?${createQueryString('page', '1')}`}>1</PaginationPage>
        <PaginationPage current href={`${pathname}?${createQueryString('page', '2')}`}>
          2
        </PaginationPage>
        <PaginationPage href={`${pathname}?${createQueryString('page', '3')}`}>3</PaginationPage>
        <PaginationGap />
        <PaginationPage href={`${pathname}?${createQueryString('page', '15')}`}>15</PaginationPage>
        <PaginationPage href={`${pathname}?${createQueryString('page', '16')}`}>16</PaginationPage>
      </PaginationList>
      <PaginationNext
        href={
          currentPage < totalPages ? `${pathname}?${createQueryString('page', (currentPage + 1).toString())}` : null
        }
      />
    </Pagination>
  )
}

export default function PaginationWrapper(props: Props) {
  return (
    <Suspense>
      <PaginationComponent {...props} />
    </Suspense>
  )
}
