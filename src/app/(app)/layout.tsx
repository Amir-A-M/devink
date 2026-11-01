import { AudioPlayer } from '@/components/common/audio/audio-player/AudioPlayer'
import Aside from '@/components/common/navigation/aside/index'
import { AudioProvider } from '@/libs/providers/AudioProvider'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AudioProvider>
      <Aside.Provider>{children}</Aside.Provider>
      <div className="fixed inset-x-0 bottom-0 z-20">
        <AudioPlayer />
      </div>
    </AudioProvider>
  )
}

export default Layout
