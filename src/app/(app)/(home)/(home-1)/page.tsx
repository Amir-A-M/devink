import BackgroundSection from '@/components/BackgroundSection'
import SectionAds from '@/components/SectionAds'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionGridPosts from '@/components/SectionGridPosts'
import SectionLargeSlider from '@/components/SectionLargeSlider'
import SectionMagazine1 from '@/components/SectionMagazine1'
import SectionMagazine2 from '@/components/SectionMagazine2'
import SectionMagazine7 from '@/components/SectionMagazine7'
import SectionMagazine8 from '@/components/SectionMagazine8'
import SectionMagazine9 from '@/components/SectionMagazine9'
import SectionPostsWithWidgets from '@/components/SectionPostsWithWidgets'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionVideos from '@/components/SectionVideos'
import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts, getPostsAudio, getPostsGallery, getPostsVideo } from '@/data/posts'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Long-form reporting, interviews, audio and video across technology, travel, food and culture.',
  // Every home layout renders the same articles. Pointing them all at the
  // primary keeps a buyer's site from competing with itself; delete the
  // layouts you do not ship and this goes away.
  alternates: { canonical: '/' },
}

const Page = async () => {
  const posts = await getAllPosts()
  const audioPosts = await getPostsAudio()
  const videoPosts = await getPostsVideo()
  const galleryPosts = await getPostsGallery()
  const authors = await getAuthors()
  const categories = await getCategories()
  const tags = await getTags()

  return (
    <div className="relative pb-28 lg:pb-32">
      <h1 className="sr-only">Ncmaz — reporting, interviews, audio and video</h1>
      <div className="relative container space-y-28 lg:space-y-32">
        <SectionLargeSlider
          heading="Editor's pick"
          subHeading="The most outstanding articles"
          className="pt-10 lg:pt-20"
          posts={audioPosts.slice(3, 8)}
        />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionSliderNewAuthors
            heading="Newest authors"
            subHeading="The latest articles from our authors"
            authors={authors.slice(0, 10)}
          />
        </div>

        <SectionSliderNewCategories
          heading="Explore categories"
          subHeading="Explore the categories"
          categories={categories.slice(0, 10)}
          categoryCardType="card4"
        />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card10V2"
            heading="Explore latest articles"
            subHeading="Click on the icon to enjoy the music"
            posts={posts.slice(0, 6)}
          />
        </div>

        <SectionMagazine1
          heading="Most viewed articles"
          subHeading="Explore the most viewed articles"
          posts={posts.slice(0, 6)}
        />

        <SectionAds />

        <SectionMagazine7
          posts={galleryPosts}
          heading="The gallery posts"
          dimHeading="The best way to showcase your work"
        />
      </div>

      <div className="my-28 bg-neutral-100 py-28 lg:py-32 dark:bg-neutral-900">
        <div className="relative container">
          <SectionGridPosts
            headingIsCenter
            postCardName="card11"
            heading="Explore latest video articles"
            subHeading="Hover over the card for a video preview"
            posts={videoPosts.slice(0, 8)}
            gridClass="md:grid-cols-2 lg:grid-cols-4"
          />
        </div>
      </div>

      <div className="container space-y-28 lg:space-y-32">
        <SectionMagazine8
          posts={audioPosts.slice(0, 6)}
          heading="Stream live audio"
          dimHeading="Click on the icon to enjoy the music"
        />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionMagazine9
            posts={audioPosts.slice(0, 9)}
            heading="Stream live audio"
            dimHeading="Click on the icon to enjoy the music"
          />
        </div>

        <SectionGridAuthorBox
          authors={authors.slice(0, 10)}
          heading="Top 10 authors of the month"
          subHeading="Discover the most popular authors of the month"
        />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionMagazine2 heading="Most viewed articles" posts={posts.slice(0, 5)} />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card11"
            heading="Best articles of the month"
            subHeading="Over 1118+ articles "
            posts={posts.slice(0, 14)}
          />
        </div>

        <SectionSubscribe2 className="pt-8" />

        <SectionVideos
          className="py-16 lg:py-20"
          heading="🎬 The Videos"
          subHeading="Check out our hottest videos. View more videos and discover new perspectives on just about any topic."
        />

        <SectionPostsWithWidgets
          posts={posts.slice(0, 6)}
          heading="Latest articles 🎈"
          subHeading="Check out our latest articles"
          widgetCategories={categories.slice(0, 5)}
          widgetAuthors={authors.slice(0, 3)}
          widgetTags={tags.slice(0, 6)}
          widgetPosts={posts.slice(0, 4)}
        />
      </div>
    </div>
  )
}

export default Page
