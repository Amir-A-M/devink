import { getNavigation } from '@/data/navigation'
import { getAllPosts } from '@/data/posts'
import { Button } from '@/shared/Button'
import Logo from '@/shared/Logo'
import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { type FC } from 'react'
import AvatarDropdown from './AvatarDropdown'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import Navigation from './Navigation/Navigation'
import NotifyDropdown from './NotifyDropdown'
import SearchModal from './SearchModal'

interface Props {
  bottomBorder?: boolean
  className?: string
}

const Header2: FC<Props> = async ({ bottomBorder, className }) => {
  const navigationMenu = await getNavigation()
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.slice(0, 2)
  const searchSuggestions = allPosts.slice(0, 4)

  return (
    <header
      className={clsx(
        'header-2 relative z-20 border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900',
        bottomBorder && 'border-b',
        !bottomBorder && 'has-[.header-popover-full-panel]:border-b',
        className
      )}
    >
      <div className="container flex h-20 justify-between">
        <div className="flex flex-1 items-center gap-x-4 sm:gap-x-5 lg:gap-x-7">
          <Logo />
          <div className="h-8 border-l"></div>
          <div className="-ms-1.5">
            <SearchModal type="type1" posts={searchSuggestions} />
          </div>
        </div>

        <div className="mx-4 hidden flex-2 justify-center lg:flex">
          <Navigation menu={navigationMenu} featuredPosts={featuredPosts} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-0.5">
          <div className="hidden sm:block">
            <Button className="h-10 px-3!" href={'/submission'} plain prefetch={false}>
              <PlusIcon className="size-5!" />
              Create
            </Button>
          </div>
          <NotifyDropdown className="me-3" />
          <AvatarDropdown />
          <div className="ms-2 flex lg:hidden">
            <HamburgerBtnMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header2
