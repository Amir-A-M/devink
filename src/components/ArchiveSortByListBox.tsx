'use client'

import { Button } from '@/shared/Button'
import { Link } from '@/shared/link'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { ArrangeByLettersAZIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { usePathname, useSearchParams } from 'next/navigation'
import { type FC, Fragment, Suspense, useCallback } from 'react'

type Props = {
  className?: string
  filterOptions: { name: string; value: string }[]
}

const ArchiveSortByListBoxComponent: FC<Props> = ({ className, filterOptions }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  let currentSortBy = searchParams.get('sort-by')
  if (!filterOptions.some((option) => option.value === currentSortBy)) {
    currentSortBy = filterOptions[0].value
  }

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className={clsx('archive-filter-list-box shrink-0', className)}>
      <Listbox value={currentSortBy}>
        <div className="relative">
          <ListboxButton as={Button} outline>
            <HugeiconsIcon icon={ArrangeByLettersAZIcon} size={24} />
            <span>{filterOptions.find((item) => item.value === currentSortBy)?.name}</span>
            <ChevronDownIcon className="size-4" aria-hidden="true" />
          </ListboxButton>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions className="absolute right-0 z-50 mt-2 max-h-60 w-52 overflow-auto rounded-xl bg-white py-1 text-sm text-neutral-900 shadow-lg ring-1 ring-black/5 focus:outline-hidden dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-700">
              {filterOptions.map((item) => (
                <ListboxOption
                  as={Link}
                  key={item.value}
                  className={({ focus: active }) =>
                    clsx(
                      'relative flex cursor-default py-2 ps-10 pe-4 select-none',
                      active && 'bg-primary-50 text-primary-700 dark:bg-neutral-700 dark:text-neutral-200'
                    )
                  }
                  value={item.value}
                  href={pathname + '?' + createQueryString('sort-by', item.value)}
                  scroll={false}
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx('block truncate', selected && 'font-medium')}>{item.name}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-primary-700 dark:text-neutral-200">
                          <CheckIcon className="size-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default function ArchiveSortByListBox(props: Props) {
  return (
    <Suspense>
      <ArchiveSortByListBoxComponent {...props} />
    </Suspense>
  )
}
