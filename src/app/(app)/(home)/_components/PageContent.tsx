import BackgroundSection from '@/components/common/general/BackgroundSection'
import SectionGridAuthorBox from '@/components/common/sections/SectionGridAuthorBox'
import SectionLargeSlider from '@/components/common/sections/SectionLargeSlider'
import SectionMagazine5 from '@/components/common/sections/SectionMagazine5'
import SectionPostsWithWidgets from '@/components/common/sections/SectionPostsWithWidgets'
import SectionSliderNewCategories from '@/components/common/sections/SectionSliderNewCategories'
import SectionSliderPosts from '@/components/common/sections/SectionSliderPosts'
import SectionSubscribe2 from '@/components/common/sections/SectionSubscribe2'
import { getAuthors } from '@/libs/data-layer/authors'
import { getCategories, getTags } from '@/libs/data-layer/categories'
import { getAllPosts, getPostsAudio } from '@/libs/data-layer/posts'

const Page = async () => {
  const posts = await getAllPosts()
  const audioPosts = await getPostsAudio()
  const authors = await getAuthors()
  const categories = await getCategories()
  const tags = await getTags()

  return (
    <div className="relative pb-28 lg:pb-32">
      <h1 className="sr-only">Devink — reporting, interviews, audio and video</h1>
      <div className="relative container space-y-28 lg:space-y-32">
        <SectionLargeSlider
          heading="Editor's pick"
          subHeading="The most outstanding articles"
          className="pt-10 lg:pt-20"
          posts={audioPosts.slice(3, 8)}
        />

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore categories"
            categoryCardType="card1"
            categories={categories.slice(0, 10)}
          />
        </div>

        <SectionSliderPosts
          postCardName="card10V2"
          heading="Explore latest articles"
          subHeading="Click on the icon to enjoy the music"
          posts={posts.slice(0, 6)}
        />
      </div>

      <div className="my-28 bg-neutral-100 py-28 lg:py-32 dark:bg-neutral-900">
        <div className="relative container">
          <SectionMagazine5 heading="Most viewed articles" posts={posts.slice(0, 5)} />
        </div>
      </div>

      <div className="container space-y-28 lg:space-y-32">
        <SectionGridAuthorBox
          authors={authors.slice(0, 5)}
          heading="Top authors of the month"
          subHeading="Discover the most popular authors of the month"
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

        <SectionSubscribe2 className="pt-8" />
      </div>
    </div>
  )
}

export default Page
