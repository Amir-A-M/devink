import React from 'react'

import type { CustomLink } from '@/data/types'

import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: 'read',
    title: 'Read',
    menus: [
      { href: '/category/technology', label: 'Technology' },
      { href: '/category/travel', label: 'Travel' },
      { href: '/tag/food', label: 'Food' },
    ],
  },
  {
    id: 'discover',
    title: 'Discover',
    menus: [
      { href: '/search', label: 'Search stories' },
      { href: '/search-2?tab=authors', label: 'Authors' },
    ],
  },
  {
    id: 'magazine',
    title: 'Magazine',
    menus: [
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    id: 'contribute',
    title: 'Contribute',
    menus: [
      { href: '/submission', label: 'Submit a story' },
      { href: '/login', label: 'Sign in' },
    ],
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu) => {
    return (
      <div key={menu.id} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item) => (
            <li key={item.href}>
              <a
                className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <footer className="nc-Footer relative border-t border-neutral-200 py-16 lg:py-28 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
        <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:flex lg:flex-col lg:md:col-span-1">
          <div className="col-span-2 md:col-span-1">
            <Logo size="size-10" />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </footer>
  )
}

export default Footer
