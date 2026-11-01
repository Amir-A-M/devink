import { siteMessages } from '@/messages/site'

export function getNavigation(): Promise<TNavigationItem[]> {
  return Promise.resolve([
    { id: 'home', href: '/', name: siteMessages.navigation.home },
    { id: 'explore', href: '/search', name: siteMessages.navigation.explore },
    { id: 'about', href: '/about', name: siteMessages.navigation.about },
    { id: 'contact', href: '/contact', name: siteMessages.navigation.contact },
  ])
}

export type TNavigationItem = Partial<{
  id: string
  href: string
  name: string
  type?: 'dropdown' | 'mega-menu'
  isNew?: boolean
  children?: TNavigationItem[]
}>

export const getLanguages = () => {
  return Promise.resolve([
    {
      id: 'English',
      name: 'English',
      description: 'United State',
      href: '#',
      active: true,
    },
    {
      id: 'Vietnamese',
      name: 'Vietnamese',
      description: 'Vietnamese',
      href: '#',
    },
    {
      id: 'Francais',
      name: 'Francais',
      description: 'Belgique',
      href: '#',
    },
    {
      id: 'Francais',
      name: 'Francais',
      description: 'Canada',
      href: '#',
    },
    {
      id: 'Francais',
      name: 'Francais',
      description: 'Belgique',
      href: '#',
    },
    {
      id: 'Francais',
      name: 'Francais',
      description: 'Canada',
      href: '#',
    },
  ])
}
export const getCurrencies = () => {
  return Promise.resolve([
    {
      id: 'EUR',
      name: 'EUR',
      href: '#',
      active: true,
    },
    {
      id: 'USD',
      name: 'USD',
      href: '#',
    },
    {
      id: 'GBF',
      name: 'GBF',
      href: '#',
    },
    {
      id: 'SAR',
      name: 'SAR',
      href: '#',
    },
    {
      id: 'QAR',
      name: 'QAR',
      href: '#',
    },
    {
      id: 'BAD',
      name: 'BAD',
      href: '#',
    },
  ])
}

export const getHeaderDropdownCategories = () => {
  return Promise.resolve([
    {
      name: 'Women',
      handle: 'all',
      description: 'New items in 2025',
    },
    {
      name: 'Man',
      handle: 'page-style-2/all',
      description: 'Perfect for gentlemen',
    },
    {
      name: 'Sports',
      handle: 'page-style-2/all',
      description: 'The needs of sports ',
    },
    {
      name: 'Beauty',
      handle: 'shoes',
      description: 'Luxury and nobility',
    },
    {
      name: 'Jewelry',
      handle: 'page-style-2/all',
      description: 'Diamond always popular',
    },
  ])
}
