import type { FC } from 'react'

import clsx from 'clsx'

import type { TAuthor } from '@/libs/data-layer/authors'
import type { TCategory, TTag } from '@/libs/data-layer/categories'
import type { TPost } from '@/libs/data-layer/posts'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import PaginationWrapper from '@/components/common/navigation/PaginationWrapper'
import Card10 from '@/components/common/posts/PostCards/Card10'
import Card11 from '@/components/common/posts/PostCards/Card11'
import Card14 from '@/components/common/posts/PostCards/Card14'
import Card3 from '@/components/common/posts/PostCards/Card3'
import Card4 from '@/components/common/posts/PostCards/Card4'
import Card7 from '@/components/common/posts/PostCards/Card7'
import Card9 from '@/components/common/posts/PostCards/Card9'
import WidgetAuthors from '@/components/common/widgets/WidgetAuthors'
import WidgetCategories from '@/components/common/widgets/WidgetCategories'
import WidgetPosts from '@/components/common/widgets/WidgetPosts'
import WidgetTags from '@/components/common/widgets/WidgetTags'
import HeadingWithSub from '@/libs/design/Heading'

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
  posts: TPost[]
  gridClass?: string
  className?: string
  heading?: string
  postCardName?: 'card10' | 'card11' | 'card14' | 'card3' | 'card4' | 'card7' | 'card9'
  widgetCategories?: TCategory[]
  widgetAuthors?: TAuthor[]
  widgetTags?: TTag[]
  widgetPosts?: TPost[]
}

const SectionPostsWithWidgets: FC<Props> = ({
  posts,
  postCardName = 'card3',
  heading,
  gridClass,
  className,
  subHeading,
  widgetCategories,
  widgetAuthors,
  widgetTags,
  widgetPosts,
  dimHeading,
}) => {
  const renderCard = (post: TPost, index: number) => {
    switch (postCardName) {
      case 'card3':
        return <Card3 key={index} className="py-3" post={post} />
      case 'card4':
        return <Card4 key={index} post={post} />
      case 'card7':
        return <Card7 key={index} post={post} ratio="aspect-1/1" />
      case 'card9':
        return <Card9 key={index} post={post} />
      case 'card10':
        return <Card10 key={index} post={post} />
      case 'card11':
        return <Card11 key={index} post={post} />
      case 'card14':
        return <Card14 key={index} post={post} />
      default:
        return null
    }
  }

  return (
    <div className={clsx('section-post-with-widgets relative', className)}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-14">
          <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading}>
            {heading}
          </HeadingWithSub>
          <div className={clsx('grid gap-6 md:gap-7', gridClass)}>{posts.map(renderCard)}</div>
          <PaginationWrapper className="mt-20" totalPages={10} />
        </div>
        <div className="mt-24 w-full space-y-7 lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
          {widgetAuthors && <WidgetAuthors authors={widgetAuthors} />}
          {widgetTags && <WidgetTags tags={widgetTags} />}
          {widgetCategories && <WidgetCategories categories={widgetCategories} />}
          {widgetPosts && <WidgetPosts posts={widgetPosts} />}
        </div>
      </div>
    </div>
  )
}

export default SectionPostsWithWidgets
