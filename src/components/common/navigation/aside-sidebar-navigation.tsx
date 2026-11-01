import Aside from '@/components/common/navigation/aside/index'
import SidebarNavigation from '@/components/layout/Header/Navigation/SidebarNavigation'
import { getNavigation } from '@/libs/data-layer/navigation'

interface Props {
  className?: string
}

const AsideSidebarNavigation = async ({ className }: Props) => {
  const navigationMenu = await getNavigation()

  return (
    <Aside openFrom="right" type="sidebar-navigation" logoOnHeading contentMaxWidthClassName="max-w-md">
      <div className="flex h-full flex-col">
        <div className="hidden-scrollbar flex-1 overflow-x-hidden overflow-y-auto py-6">
          <SidebarNavigation data={navigationMenu} />
        </div>
      </div>
    </Aside>
  )
}

export default AsideSidebarNavigation
