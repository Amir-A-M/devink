import BackgroundSection from '@/components/BackgroundSection'
import SectionAds from '@/components/SectionAds'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionGridPosts from '@/components/SectionGridPosts'
import SectionHero2 from '@/components/SectionHero2'
import SectionMagazine6 from '@/components/SectionMagazine6'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionTrending from '@/components/SectionTrending'
import SectionVideos from '@/components/SectionVideos'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { getAllPosts, getPostsVideo } from '@/data/posts'
import becomAuthorImg from '@/images/BecomeAnAuthorImg.webp'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home — layout 4',
  description: 'Long-form reporting, interviews, audio and video across technology, travel, food and culture.',
  // Every home layout renders the same articles. Pointing them all at the
  // primary keeps a buyer's site from competing with itself; delete the
  // layouts you do not ship and this goes away.
  alternates: { canonical: '/' },
}

const Page = async () => {
  const posts = await getAllPosts()
  const videoPosts = await getPostsVideo()
  const authors = await getAuthors()
  const categories = await getCategories()

  return (
    <div className="relative">
      <SectionHero2 />

      <div className="relative container space-y-28 pb-28 lg:space-y-32 lg:pb-32">
        <SectionTrending
          posts={posts.slice(0, 8)}
          heading="Trending articles"
          subHeading="Explore 1129+ other articles"
          className="pt-16 lg:pt-20"
        />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Subtopics of Travel"
            subHeading="Explore 1129+ other articles"
            categories={categories}
          />
        </div>

        <SectionMagazine6 posts={posts.slice(0, 8)} heading="🧩 Editor Picks" />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionSliderNewAuthors
            heading="Newest authors"
            subHeading="Say hello to future creator potentials"
            authors={authors.slice(0, 10)}
          />
        </div>

        <SectionSubscribe2 />

        <SectionAds />

        <SectionVideos />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionGridPosts
            headingIsCenter
            postCardName="card10V2"
            heading="Explore latest video articles"
            subHeading="Hover on the post card and preview video 🥡"
            posts={videoPosts.slice(0, 6)}
            gridClass="sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>

        <SectionBecomeAnAuthor rightImg={becomAuthorImg} />
      </div>

      <div className="bg-neutral-100 dark:bg-white/5">
        <div className="relative container">
          <SectionGridPosts
            className="py-16 lg:py-28"
            postCardName="card11"
            heading="Explore other latest articles"
            subHeading="Explore 1129 other articles"
            posts={posts.slice(0, 8)}
            gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          />
        </div>
      </div>
    </div>
  )
}

export default Page
