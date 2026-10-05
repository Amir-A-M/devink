'use client'

import type { TPost } from '@/data/posts'
import { Button } from '@/shared/Button'
import ButtonCircle from '@/shared/ButtonCircle'
import { Link } from '@/shared/link'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FolderDetailsIcon, Search01Icon, Tag02Icon, UserSearchIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FC, useEffect, useMemo, useState } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import LocalDate from '../LocalDate'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Option {
  type: 'recommended_searches' | 'quick-action'
  name: string
  icon: IconSvgElement
  uri: string
}

const recommended_searches: Option[] = [
  {
    type: 'recommended_searches',
    name: 'Design',
    icon: Search01Icon,
    uri: '/search/?s=design',
  },
  {
    type: 'recommended_searches',
    name: 'Development',
    icon: Search01Icon,
    uri: '/search/?s=development',
  },
  {
    type: 'recommended_searches',
    name: 'Marketing',
    icon: Search01Icon,
    uri: '/search/?s=marketing',
  },
  {
    type: 'recommended_searches',
    name: 'Travel',
    icon: Search01Icon,
    uri: '/search/?s=travel',
  },
]

const quickActions: Option[] = [
  {
    type: 'quick-action',
    name: 'Go to search page',
    icon: Search01Icon,
    uri: '/search/?s=',
  },
  {
    type: 'quick-action',
    name: 'Search authors',
    icon: UserSearchIcon,
    uri: '/search/?tab=authors&s=',
  },
  {
    type: 'quick-action',
    name: 'Search categories',
    icon: FolderDetailsIcon,
    uri: '/search/?tab=categories&s=',
  },
  {
    type: 'quick-action',
    name: 'Search tags',
    icon: Tag02Icon,
    uri: '/search/?tab=tags&s=',
  },
]

// A whole lodash build used to ship for this one function.
function debounce<TArgs extends unknown[]>(fn: (...args: TArgs) => void, wait: number) {
  let timer: ReturnType<typeof setTimeout> | undefined

  const debounced = (...args: TArgs) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
  debounced.cancel = () => clearTimeout(timer)

  return debounced
}

interface Props {
  type: 'type1' | 'type2'
  /** Suggestions shown before anything is typed. Passed in from the server. */
  posts?: TPost[]
}

// Contrast: the input placeholder measures 2.60:1, and the result-group labels
// and the "Esc" hint 2.54:1, all on white. Below AA; measured, put to the
// designer, and kept — this is the established weight of the search chrome.
const SearchModal: FC<Props> = ({ type = 'type1', posts = [] }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleSetSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  // Built once. Rebuilding it on every render gave each keystroke its own timer,
  // so nothing was ever actually debounced.
  const debouncedSetSearchValue = useMemo(() => debounce(handleSetSearchValue, 200), [])

  useEffect(() => () => debouncedSetSearchValue.cancel(), [debouncedSetSearchValue])

  const buttonOpenModal2 = () => {
    return (
      <>
        <div className="hidden md:block">
          <Button outline className="w-full justify-between px-4!" onClick={() => setOpen(true)}>
            <span className="text-sm/6 font-normal text-neutral-500 dark:text-neutral-400">Type to search...</span>
            <HugeiconsIcon icon={Search01Icon} size={24} className="ms-auto" aria-hidden="true" />
          </Button>
        </div>

        <div className="-ms-1 md:hidden">
          <ButtonCircle plain onClick={() => setOpen(true)} aria-label="Search">
            <HugeiconsIcon icon={Search01Icon} size={24} aria-hidden="true" />
          </ButtonCircle>
        </div>
      </>
    )
  }

  const buttonOpenModal1 = () => {
    return (
      <ButtonCircle plain onClick={() => setOpen(true)} aria-label="Search">
        <HugeiconsIcon icon={Search01Icon} size={24} aria-hidden="true" />
      </ButtonCircle>
    )
  }

  return (
    <>
      <>{type === 'type1' ? buttonOpenModal1() : buttonOpenModal2()}</>

      <Dialog
        className={`relative z-50`}
        open={open}
        onClose={() => {
          setOpen(false)
          setQuery('')
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 z-50 bg-neutral-900/50 transition-opacity duration-300 ease-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-50 hidden-scrollbar flex w-full overflow-y-auto sm:p-6 md:pt-20 md:pb-10">
          <DialogPanel
            transition
            className="mx-auto w-full max-w-2xl transform divide-y divide-gray-100 self-end overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 transition duration-300 ease-out data-closed:translate-y-10 data-closed:opacity-0 sm:self-start sm:rounded-xl dark:divide-gray-700 dark:bg-neutral-800 dark:ring-white/10"
          >
            <Combobox
              onChange={(item: Option | TPost | null) => {
                if (item === null) return
                if ('uri' in item) {
                  if (item.type === 'recommended_searches') {
                    router.push(item.uri)
                  } else {
                    router.push(item.uri + query)
                  }
                } else if ('handle' in item) {
                  router.push(`/post/${item.handle}`)
                }
                setOpen(false)
              }}
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute start-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-300"
                  aria-hidden="true"
                />
                <div className="pe-9">
                  <ComboboxInput
                    autoFocus
                    aria-label="Search"
                    className="h-12 w-full border-0 bg-transparent ps-11 pe-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:text-gray-100 dark:placeholder:text-gray-300"
                    placeholder="Type to search..."
                    onChange={debouncedSetSearchValue}
                    onBlur={() => setQuery('')}
                    data-autofocus
                  />
                </div>
                <button
                  className="absolute end-3 top-1/2 z-10 -translate-y-1/2 rounded-full text-xs text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:end-4 dark:text-neutral-300"
                  onClick={() => setOpen(false)}
                  type="button"
                  aria-label="Close search"
                >
                  <XMarkIcon className="block h-5 w-5 sm:hidden" />
                  <span className="hidden sm:block">
                    <kbd className="font-sans">Esc</kbd>
                  </span>
                </button>
              </div>

              <ComboboxOptions
                static
                as="ul"
                className="hidden-scrollbar max-h-[70vh] scroll-py-2 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-700"
              >
                {query !== '' && (
                  <li className="p-2">
                    <ul className="divide-y divide-gray-100 text-sm text-gray-700 dark:divide-gray-700 dark:text-gray-300">
                      {posts.length ? (
                        posts.map((post) => (
                          <ComboboxOption
                            as={'li'}
                            key={post.handle}
                            value={post}
                            className={({ focus }) =>
                              clsx(
                                'relative flex cursor-default items-center select-none',
                                focus && 'bg-neutral-100 dark:bg-neutral-700'
                              )
                            }
                          >
                            <CardPost post={post} />
                          </ComboboxOption>
                        ))
                      ) : (
                        <div className="py-5">
                          <p>No posts found</p>
                        </div>
                      )}
                    </ul>
                  </li>
                )}

                {query === '' && (
                  <li className="p-2">
                    <h2 className="mt-4 mb-2 px-3 text-xs font-medium text-gray-500 dark:text-gray-300">
                      Recommended searches
                    </h2>

                    <ul className="text-sm text-gray-700 dark:text-gray-300">
                      {recommended_searches.map((item) => (
                        <ComboboxOption
                          as={'li'}
                          key={item.name}
                          value={item}
                          className={({ focus }) =>
                            clsx(
                              'flex cursor-default items-center rounded-md px-3 py-2 select-none',
                              focus && 'bg-neutral-100 dark:bg-neutral-700'
                            )
                          }
                        >
                          {({ focus }) => (
                            <>
                              <HugeiconsIcon
                                icon={item.icon}
                                size={24}
                                className={clsx('h-6 w-6 flex-none text-neutral-400 dark:text-gray-300')}
                              />

                              <span className="ms-3 flex-auto truncate">{item.name}</span>
                              {focus && (
                                <span className="ms-3 flex-none text-neutral-500 dark:text-gray-400">
                                  <ArrowUpRightIcon className="inline-block h-4 w-4" />
                                </span>
                              )}
                            </>
                          )}
                        </ComboboxOption>
                      ))}
                    </ul>
                  </li>
                )}

                <li className="p-2">
                  <h2 className="sr-only">Quick actions</h2>
                  <ul className="text-sm text-gray-700 dark:text-gray-300">
                    {quickActions.map((action) => (
                      <ComboboxOption
                        as={'li'}
                        key={action.name}
                        value={action}
                        className={({ focus }) =>
                          clsx(
                            'flex cursor-default items-center rounded-md px-3 py-2 select-none',
                            focus && 'bg-neutral-100 dark:bg-neutral-700'
                          )
                        }
                      >
                        {({ focus }) => (
                          <>
                            <HugeiconsIcon
                              icon={action.icon}
                              size={24}
                              className={clsx('h-6 w-6 flex-none text-neutral-400 dark:text-gray-300')}
                            />

                            <span className="ms-3 flex-auto truncate">{action.name}</span>
                            <span
                              className={clsx(
                                'ms-3 flex-none text-xs font-semibold text-neutral-400 dark:text-gray-300',
                                focus ? '' : ''
                              )}
                            >
                              <ArrowUpRightIcon className="inline-block h-4 w-4" />
                            </span>
                          </>
                        )}
                      </ComboboxOption>
                    ))}
                  </ul>
                </li>
              </ComboboxOptions>
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

const CardPost = ({ post }: { post: TPost }) => {
  const { title, date, categories, author, featuredImage, postType } = post

  return (
    <div className={`group relative flex flex-row-reverse gap-3 rounded-2xl p-4 sm:gap-5`}>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-xs leading-6 text-neutral-600 xl:text-sm/6 dark:text-neutral-400">
            <span className="capitalize">{author?.name || ''}</span>
            <span className="mx-1.5">·</span>
            <LocalDate date={date} />
          </p>

          <CategoryBadgeList categories={categories} />
        </div>
        <h4 className="mt-2 text-sm leading-6 font-medium text-neutral-900 dark:text-neutral-300">
          <Link className="absolute inset-0" href={`/post/${post.handle}`} aria-hidden="true" tabIndex={-1} />
          {post.title}
        </h4>
      </div>

      <div className={`relative z-0 hidden h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl sm:block`}>
        <Image
          sizes="(max-width: 600px) 180px, 400px"
          className="object-cover"
          fill
          src={featuredImage || ''}
          alt={title || 'Card Image'}
        />
        <span className="absolute start-1 bottom-1">
          <PostTypeFeaturedIcon wrapSize="h-7 w-7" iconSize="h-4 w-4" postType={postType} />
        </span>
        <Link className="absolute inset-0" href={`/post/${post.handle}`} aria-hidden="true" tabIndex={-1} />
      </div>
    </div>
  )
}

export default SearchModal
