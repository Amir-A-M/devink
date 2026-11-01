import SingleContentContainer from '@/app/(app)/post/SingleContentContainer'
import SingleHeaderContainer from '@/app/(app)/post/SingleHeaderContainer'
import SingleRelatedPosts from '@/app/(app)/post/SingleRelatedPosts'
import WidgetAuthors from '@/components/common/widgets/WidgetAuthors'
import WidgetCategories from '@/components/common/widgets/WidgetCategories'
import WidgetPosts from '@/components/common/widgets/WidgetPosts'
import WidgetTags from '@/components/common/widgets/WidgetTags'
import { getAuthors } from '@/libs/data-layer/authors'
import { getCategories, getTags } from '@/libs/data-layer/categories'
import { getAllPosts, getCommentsByPostId, getPostByHandle } from '@/libs/data-layer/posts'
import { buildArticleJsonLd } from '@/libs/utils/post-metadata'

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const post = await getPostByHandle(handle)
  const comments = await getCommentsByPostId(post.id)
  const relatedPosts = (await getAllPosts()).slice(0, 6)
  const moreFromAuthorPosts = (await getAllPosts()).slice(1, 7)

  const widgetPosts = (await getAllPosts()).slice(0, 6)
  const widgetCategories = (await getCategories()).slice(0, 6)
  const widgetTags = (await getTags()).slice(0, 6)
  const widgetAuthors = (await getAuthors()).slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(post)) }}
      />
      <div className="single-post-page">
        <SingleHeaderContainer post={post} />

        <div className="container mt-12 flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
            <SingleContentContainer post={post} comments={comments} />
          </div>
          <div className="mt-12 w-full lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
            <div className="space-y-7 lg:sticky lg:top-7">
              <WidgetAuthors authors={widgetAuthors} />
              <WidgetTags tags={widgetTags} />
              <WidgetCategories categories={widgetCategories} />
              <WidgetPosts posts={widgetPosts} />
            </div>
          </div>
        </div>

        <SingleRelatedPosts relatedPosts={relatedPosts} moreFromAuthorPosts={moreFromAuthorPosts} />
      </div>
    </>
  )
}

export default Page
