'use client'

import Avatar from '@/shared/Avatar'
import ButtonCircle from '@/shared/ButtonCircle'
import { Divider } from '@/shared/divider'
import { Link } from '@/shared/link'
import SwitchDarkMode2 from '@/shared/SwitchDarkMode2'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import {
  BulbChargingIcon,
  FavouriteIcon,
  Idea01Icon,
  Logout01Icon,
  PlusSignCircleIcon,
  Task01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
  className?: string
}

export default function AvatarDropdown({ className }: Props) {
  const user = {
    name: 'John Doe',
    email: 'john@gmail.com',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    handle: 'john-doe',
    location: 'Los Angeles, CA',
    bio: 'I am a software engineer and a writer. I love to write about technology and programming.',
  }

  return (
    <div className={className}>
      <Popover>
        <PopoverButton as={ButtonCircle} className="relative" plain aria-label="Account menu">
          <Avatar alt="" src={user.avatar} width={32} height={32} className="size-8 rounded-full object-cover" />
        </PopoverButton>

        <PopoverPanel
          transition
          anchor={{
            to: 'bottom end',
            gap: 16,
          }}
          className="z-40 w-80 rounded-3xl shadow-lg ring-1 ring-black/5 transition duration-200 ease-in-out data-closed:translate-y-1 data-closed:opacity-0"
        >
          <div className="relative flex flex-col gap-y-6 bg-white px-6 py-7 dark:bg-neutral-800">
            <div className="relative flex items-center gap-x-3">
              <Avatar alt="" src={user.avatar} width={48} height={48} className="size-12 rounded-full object-cover" />
              <div className="grow">
                <h4 className="font-semibold">
                  {user.name}
                  <Link href={`/author/${user.handle}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1} />
                </h4>
                <p className="text-xs/6">{user.location}</p>
              </div>
            </div>

            <Divider />

            {/* ------------------ 1 --------------------- */}
            <Link
              href={'/author/john-doe'}
              className="-m-3 flex items-center gap-x-4 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50 dark:hover:bg-neutral-700"
            >
              <div className="flex shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
                <HugeiconsIcon icon={UserIcon} size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium">My Account</p>
            </Link>

            {/* ------------------ 2 --------------------- */}
            <Link
              href={'/dashboard/posts'}
              className="-m-3 flex items-center gap-x-4 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50 dark:hover:bg-neutral-700"
            >
              <div className="flex shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
                <HugeiconsIcon icon={Task01Icon} size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium">My Posts</p>
            </Link>

            {/* ------------------ 2 --------------------- */}
            <Link
              href={`/author/${user.handle}?tab=favorites`}
              className="-m-3 flex items-center gap-x-4 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50 dark:hover:bg-neutral-700"
            >
              <div className="flex shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
                <HugeiconsIcon icon={FavouriteIcon} size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium">Favorites</p>
            </Link>

            {/* ------------------ 2 --------------------- */}
            <Link
              href={`/submission`}
              prefetch={false}
              className="-m-3 flex items-center gap-x-4 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50 dark:hover:bg-neutral-700"
            >
              <div className="flex shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
                <HugeiconsIcon icon={PlusSignCircleIcon} size={24} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium">Submission</p>
            </Link>

            <Divider />

            {/* ------------------ 2 --------------------- */}
            <div className="focus-visible:ring-opacity-50 -m-3 flex items-center justify-between rounded-lg p-2 hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 dark:hover:bg-neutral-700">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
                  <HugeiconsIcon icon={Idea01Icon} size={24} strokeWidth={1.5} />
                </div>
                <p className="ms-4 text-sm font-medium">Dark theme</p>
              </div>
              <SwitchDarkMode2 />
            </div>

            {/* ------------------ 2 --------------------- */}

            <Link
              href={'#'}
              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50 dark:hover:bg-neutral-700"
            >
              <div className="flex shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
                <HugeiconsIcon icon={BulbChargingIcon} size={24} strokeWidth={1.5} />
              </div>
              <p className="ms-4 text-sm font-medium">{'Help'}</p>
            </Link>

            {/* ------------------ 2 --------------------- */}
            <Link
              href={'#'}
              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50 dark:hover:bg-neutral-700"
            >
              <div className="flex shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
                <HugeiconsIcon icon={Logout01Icon} size={24} strokeWidth={1.5} />
              </div>
              <p className="ms-4 text-sm font-medium">{'Log out'}</p>
            </Link>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  )
}
