import BackgroundSection from '@/components/BackgroundSection'
import SectionAds from '@/components/SectionAds'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionHero from '@/components/SectionHero'
import SectionMagazine5 from '@/components/SectionMagazine5'
import SectionMagazine8 from '@/components/SectionMagazine8'
import SectionMagazine9 from '@/components/SectionMagazine9'
import SectionPostsWithWidgets from '@/components/SectionPostsWithWidgets'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionVideos from '@/components/SectionVideos'
import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts, getPostsAudio } from '@/data/posts'
import Vector1 from '@/images/Vector1.webp'
import rightImg from '@/images/hero-right.webp'
import { type Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Home — layout 3',
  description: 'Long-form reporting, interviews, audio and video across technology, travel, food and culture.',
  // Every home layout renders the same articles. Pointing them all at the
  // primary keeps a buyer's site from competing with itself; delete the
  // layouts you do not ship and this goes away.
  alternates: { canonical: '/' },
}

const Page = async () => {
  const posts = await getAllPosts()
  const audioPosts = await getPostsAudio()
  const authors = await getAuthors()
  const categories = await getCategories()
  const tags = await getTags()

  return (
    <div className="relative container space-y-28 pb-28 lg:space-y-32 lg:pb-32">
      <h1 className="sr-only">Ncmaz — reporting, interviews, audio and video</h1>
      <SectionHero
        rightImg={rightImg}
        className="pt-14 lg:pt-20"
        heading={
          <span>
            Far from face <br /> but not from {` `}
            <span className="relative pr-3">
              <Image className="absolute -start-1 top-1/2 w-full -translate-y-1/2" src={Vector1} alt="hero-right" />
              <span className="relative">heart</span>
            </span>
          </span>
        }
        btnText="Getting started"
        subHeading="Let stay at home and share with everyone the most beautiful stories in your hometown 🎈"
      />

      <SectionGridCategoryBox
        categoryCardType="card2"
        categories={categories.slice(0, 10)}
        heading="Top trending topics"
        subHeading="Explore the most popular categories"
      />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionMagazine5 heading="🧩 Editor's picks" posts={posts.slice(0, 5)} />
      </div>

      <SectionSliderPosts
        postCardName="card10"
        heading="Sea travel enthusiast"
        subHeading="Over 218 articles about sea travel"
        posts={posts.slice(0, 8)}
      />

      <SectionAds />

      <SectionMagazine8
        posts={audioPosts.slice(0, 6)}
        heading="Latest audio articles"
        subHeading="Over 1000+ audio articles"
      />

      <div className="relative py-16">
        <BackgroundSection />
        <SectionMagazine9
          posts={audioPosts.slice(0, 9)}
          heading="Latest audio articles"
          subHeading="Over 1000+ audio articles"
        />
      </div>

      <SectionVideos />

      <div className="relative py-16 lg:py-20">
        <BackgroundSection />
        <SectionSliderNewAuthors
          heading="Newest authors"
          subHeading="Say hello to future creator potentials"
          authors={authors.slice(0, 10)}
        />
      </div>

      <SectionBecomeAnAuthor />

      <SectionPostsWithWidgets
        posts={posts.slice(0, 8)}
        postCardName="card7"
        gridClass="sm:grid-cols-2"
        heading="Latest articles"
        subHeading="Explore the most popular categories"
        widgetAuthors={authors.slice(0, 4)}
        widgetCategories={categories.slice(0, 4)}
        widgetTags={tags.slice(0, 6)}
        widgetPosts={posts.slice(0, 4)}
      />

      <SectionSubscribe2 />
    </div>
  )
}

export default Page
