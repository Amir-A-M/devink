import { getAuthors } from '@/libs/data-layer/authors'
import { getCategories, getTags } from '@/libs/data-layer/categories'
import { getAllPosts } from '@/libs/data-layer/posts'

export async function getSearchResults(query: string, type: 'authors' | 'categories' | 'posts' | 'tags') {
  switch (type) {
    case 'categories':
      return {
        query,
        categories: (await getCategories()).slice(0, 15).sort(() => Math.random() - 0.5),
        totalResults: 1500,
        recommendedSearches: ['Travel', 'Food', 'Fashion', 'Technology'],
      }
    case 'tags':
      return {
        query,
        tags: (await getTags()).sort(() => Math.random() - 0.5),
        totalResults: 1000,
        recommendedSearches: ['Travel', 'Food', 'Fashion', 'Technology'],
      }
    case 'authors':
      return {
        query,
        authors: (await getAuthors()).slice(0, 12).sort(() => Math.random() - 0.5),
        totalResults: 200,
        recommendedSearches: ['Design', 'Photo', 'Vector', 'Frontend'],
      }
    case 'posts':
      return {
        query,
        posts: (await getAllPosts()).slice(0, 12).sort(() => Math.random() - 0.5),
        totalResults: 1135,
        recommendedSearches: ['Design', 'Photo', 'Vector', 'Frontend'],
      }
  }
}
