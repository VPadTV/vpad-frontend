'use client'
import { useEffect } from 'react'
import PostCard from './PostCard'
import { Button } from '../ui/Button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getPosts, setPage } from '@/redux/features/postSlice'

interface PostListProps {
  searchTerm: string
  sortBy: string
  nsfw: boolean
  tags: string
}

export default function PostList({ searchTerm, sortBy, nsfw, tags }: PostListProps) {
  const dispatch = useAppDispatch()
  const { posts, pagination, loading, error } = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getPosts({
      search: searchTerm,
      page: pagination.page,
      size: pagination.size,
      sortBy: sortBy as 'latest' | 'oldest' | 'high-views' | 'low-views',
      nsfw: nsfw,
      tags: tags
    }))
  }, [dispatch, searchTerm, sortBy, nsfw, tags, pagination.page])

  const handlePageChange = (pageNumber: number) => {
    const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.size));
    const validPage = Math.max(1, Math.min(pageNumber, totalPages));
    dispatch(setPage(validPage));
  }
  
  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.size));
  
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(pagination.page - halfVisiblePages, 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    
    return Array.from({ length: Math.max(0, endPage - startPage + 1) }, (_, i) => startPage + i);
  };
  
  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }
  
  if (error && posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium">No posts found</h3>
          <p className="text-subtext mt-2">Try adjusting your search or filters</p>
        </div>
      )}
      
      {posts.length > 0 && (
        <div className="mt-16 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(1)}
              disabled={pagination.page === 1}
              className="px-3"
              aria-label="First page"
            >
              &laquo;
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3"
              aria-label="Previous page"
            >
              &lsaquo;
            </Button>
            
            {(getPageNumbers().length > 0 ? getPageNumbers() : [1]).map(pageNumber => (
              <Button
                key={pageNumber}
                variant={pagination.page === pageNumber ? "primary" : "outline"}
                onClick={() => handlePageChange(pageNumber)}
                className="w-10 h-10 p-0"
              >
                {pageNumber}
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= totalPages}
              className="px-3"
              aria-label="Next page"
            >
              &rsaquo;
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(totalPages)}
              disabled={pagination.page >= totalPages}
              className="px-3"
              aria-label="Last page"
            >
              &raquo;
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center text-subtext">Loading...</div>
          ) : (
            <p className="text-center text-subtext">
              {posts.length > 0 ? (
                <>
                  Showing <span className="font-medium">{((pagination.page - 1) * pagination.size) + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(pagination.page * pagination.size, pagination.total)}</span> of{' '}
                  <span className="font-medium">{pagination.total}</span> posts
                </>
              ) : (
                <>No posts found</>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
