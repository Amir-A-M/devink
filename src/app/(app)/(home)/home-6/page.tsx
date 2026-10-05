import Card10 from '@/components/PostCards/Card10'
import { getPostsAudio, getPostsDefault, getPostsGallery, getPostsVideo } from '@/data/posts'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home — layout 6',
  description: 'Long-form reporting, interviews, audio and video across technology, travel, food and culture.',
  // Every home layout renders the same articles. Pointing them all at the
  // primary keeps a buyer's site from competing with itself; delete the
  // layouts you do not ship and this goes away.
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
}

// A deliberately minimal home layout: one grid, no hero, no sliders. Useful as
// a starting point when you want to build your own landing page from scratch.

const Page = async () => {
  const posts = (await getPostsAudio()).slice(0, 2)
  const posts2 = (await getPostsVideo()).slice(0, 2)
  const posts3 = (await getPostsGallery()).slice(0, 2)
  const posts4 = (await getPostsDefault()).slice(0, 2)

  return (
    <div className="relative container space-y-28 pb-28 lg:space-y-32 lg:pb-32">
      <h1 className="sr-only">Ncmaz — reporting, interviews, audio and video</h1>
      <div className="grid grid-cols-1 gap-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {[...posts, ...posts2, ...posts3, ...posts4].map((post) => (
          <Card10 key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Page
