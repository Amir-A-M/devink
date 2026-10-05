import WidgetAuthors from '@/components/WidgetAuthors'
import WidgetCategories from '@/components/WidgetCategories'
import WidgetPosts from '@/components/WidgetPosts'
import WidgetTags from '@/components/WidgetTags'
import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts, getCommentsByPostId, getPostByHandle } from '@/data/posts'
import { buildArticleJsonLd, buildPostMetadata } from '@/lib/post-metadata'
import { type Metadata } from 'next'
import SingleContentContainer from '../SingleContentContainer'
import SingleHeaderContainer from '../SingleHeaderContainer'
import SingleRelatedPosts from '../SingleRelatedPosts'

// Prerender every post at build time; nothing renders on demand.
export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ handle: post.handle }))
}

// An unknown handle 404s instead of rendering on demand, so a crawler cannot
// mint unbounded ISR entries. Set this to true once a real CMS can add posts
// after the build.
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const post = await getPostByHandle(handle)
  if (!post) {
    return {
      title: 'Post not found',
      description: 'Post not found',
    }
  }
  return buildPostMetadata(post)
}

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
