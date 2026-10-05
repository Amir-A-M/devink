import BackgroundSection from '@/components/BackgroundSection'
import Card15Podcast from '@/components/PostCards/Card15Podcast'
import Card16Podcast from '@/components/PostCards/Card16Podcast'
import SectionAds from '@/components/SectionAds'
import SectionHero3 from '@/components/SectionHero3'
import SectionMagazine4 from '@/components/SectionMagazine4'
import SectionPostsWithWidgets from '@/components/SectionPostsWithWidgets'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionVideos from '@/components/SectionVideos'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { getAllPosts, getPostsAudio, getPostsDefault } from '@/data/posts'
import HeadingWithSub from '@/shared/Heading'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home — layout 2',
  description: 'Long-form reporting, interviews, audio and video across technology, travel, food and culture.',
  // Every home layout renders the same articles. Pointing them all at the
  // primary keeps a buyer's site from competing with itself; delete the
  // layouts you do not ship and this goes away.
  alternates: { canonical: '/' },
}

const Page = async () => {
  const posts = await getAllPosts()
  const defautPosts = await getPostsDefault()
  const audioPosts = await getPostsAudio()
  const authors = await getAuthors()
  const categories = await getCategories()

  return (
    <div className="relative container space-y-28 pb-28 lg:space-y-32 lg:pb-32">
      <h1 className="sr-only">Ncmaz — reporting, interviews, audio and video</h1>
      <SectionHero3 posts={defautPosts.slice(2, 6)} />

      <SectionSliderNewCategories
        heading="Top trending topics"
        categoryCardType="card5"
        subHeading="Discover over 112 topics"
        categories={categories.filter((_, i) => i < 10)}
      />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card7"
          heading="Explore our latest articles"
          subHeading="Over 2000+ articles"
          posts={posts.slice(0, 8)}
        />
      </div>

      <div>
        <HeadingWithSub subHeading="Over 1000+ audio articles">Latest audio articles</HeadingWithSub>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {audioPosts.slice(0, 3).map((p) => (
            <Card16Podcast key={p.id} post={p} />
          ))}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {audioPosts.slice(3, 9).map((p) => (
                <Card15Podcast key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionAds />

      <SectionMagazine4 heading="Life styles 🎨 " posts={posts.slice(0, 8)} />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionSliderNewAuthors
          heading="Top authors of month"
          subHeading="Say hello to future creator potentials"
          authors={authors.slice(0, 10)}
        />
      </div>

      <SectionSubscribe2 />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card9"
          heading="Sea travel enthusiast"
          subHeading="Over 218 articles about sea travel"
          posts={posts.slice(0, 8)}
        />
      </div>

      <SectionVideos />

      <SectionPostsWithWidgets
        postCardName="card14"
        gridClass="sm:grid-cols-2"
        posts={posts.slice(0, 8)}
        heading="Latest articles"
        subHeading="Over 2000+ articles"
        widgetCategories={categories.slice(0, 4)}
        widgetAuthors={authors.slice(0, 3)}
        widgetPosts={posts.slice(0, 4)}
      />
    </div>
  )
}

export default Page
