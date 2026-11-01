import type { Metadata } from 'next'

import { getAllPosts, getPostByHandle } from '@/libs/data-layer/posts'
import { buildPostMetadata } from '@/libs/utils/post-metadata'

import PageContent from './_components/PageContent'

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ handle: post.handle }))
}

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

export default PageContent
