import { Aside as AsideComponent, AsideProvider, useAside } from '@/components/common/navigation/aside/aside'

type AsideType = {
  Provider: typeof AsideProvider
} & typeof AsideComponent

const Aside = AsideComponent as AsideType
Aside.Provider = AsideProvider

export { useAside }
export default Aside
