'use client'

import { type TNavigationItem } from '@/data/navigation'
import { Divider } from '@/shared/divider'
import { Link } from '@/shared/link'
import SocialsList from '@/shared/SocialsList'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import { Disclosure, DisclosureButton, DisclosurePanel, useClose } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
  data: TNavigationItem[]
}

const SidebarNavigation: React.FC<Props> = ({ data }) => {
  const handleClose = useClose()

  const _renderMenuChild = (
    item: TNavigationItem,
    itemClass = 'ps-3 text-neutral-900 dark:text-neutral-200 font-medium'
  ) => {
    return (
      <ul className="nav-mobile-sub-menu ps-6 pb-1 text-base">
        {item.children?.map((childMenu, index) => (
          <Disclosure key={index} as="li">
            <div
              className={`mt-0.5 flex rounded-lg pe-4 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${itemClass}`}
            >
              <Link
                href={childMenu.href || '#'}
                onClick={handleClose}
                className={`py-2.5 ${!childMenu.children ? 'block w-full' : ''}`}
              >
                {childMenu.name}
              </Link>
              {childMenu.children && (
                <DisclosureButton
                  className="flex grow cursor-pointer items-center justify-end"
                  aria-label={`Show ${childMenu.name} sub menu`}
                >
                  <ChevronDownIcon className="ms-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
                </DisclosureButton>
              )}
            </div>
            {childMenu.children && (
              <DisclosurePanel>
                {_renderMenuChild(childMenu, 'ps-3 text-neutral-600 dark:text-neutral-400')}
              </DisclosurePanel>
            )}
          </Disclosure>
        ))}
      </ul>
    )
  }

  const _renderItem = (menu: TNavigationItem, index: number) => {
    return (
      <Disclosure key={index} as="li" className="text-neutral-900 dark:text-white">
        <div className="flex w-full rounded-lg px-3 text-start text-sm font-medium tracking-wide uppercase hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <Link
            href={menu.href || '#'}
            className={clsx(!menu.children?.length && 'flex-1', 'block py-2.5')}
            onClick={handleClose}
          >
            {menu.name}
          </Link>
          {!!menu.children?.length && (
            <DisclosureButton
              className="flex flex-1 cursor-pointer justify-end"
              aria-label={`Show ${menu.name} sub menu`}
            >
              <ChevronDownIcon className="ms-2 h-4 w-4 self-center text-neutral-500" aria-hidden="true" />
            </DisclosureButton>
          )}
        </div>
        {menu.children && <DisclosurePanel>{_renderMenuChild(menu)}</DisclosurePanel>}
      </Disclosure>
    )
  }

  const renderSearchForm = () => {
    return (
      <form
        action="#"
        method="POST"
        className="flex-1 text-neutral-900 dark:text-neutral-200"
        onSubmit={(e) => {
          e.preventDefault()
          handleClose()
          redirect('/search')
        }}
      >
        <div className="flex h-full items-center gap-x-2.5 rounded-xl bg-neutral-50 px-3 py-3 dark:bg-neutral-800">
          <HugeiconsIcon icon={Search01Icon} size={24} color="currentColor" strokeWidth={1.5} />
          <input
            type="search"
            placeholder="Type and press enter"
            className="w-full border-none bg-transparent focus:ring-0 focus:outline-hidden sm:text-sm"
          />
        </div>
        <input type="submit" hidden value="" />
      </form>
    )
  }

  return (
    <div>
      <p className="text-sm/relaxed">
        Discover the most outstanding articles on all topics of life. Write your stories and share them
      </p>
      <div className="mt-5 flex items-center justify-between">
        <SocialsList />
      </div>
      <div className="mt-5">{renderSearchForm()}</div>
      <ul className="flex flex-col gap-y-1 px-2 py-6">{data?.map(_renderItem)}</ul>
      <Divider className="mb-6" />

      <div className="flex items-center py-6">
        <SwitchDarkMode />
      </div>
    </div>
  )
}

export default SidebarNavigation
