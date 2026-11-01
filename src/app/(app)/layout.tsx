import Aside from '@/components/aside'
import { AudioPlayer } from '@/components/audio-player/AudioPlayer'
import { AudioProvider } from '@/components/AudioProvider'

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
