import PostCard from './PostCard'
import { useEffect, useState } from 'react'
import { getPosts } from '@/utils/api/postApi'

type SortByOption = "oldest" | "latest" | "high-views" | "low-views";

interface PostsProps {
  tierId?: string;
  filters?: {
    tags: string[];
    search: string;
    sortBy?: string;
  };
}

function Posts({ tierId, filters }: PostsProps) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        
        const tagsParam = filters?.tags?.length 
          ? filters.tags.join(',') 
          : undefined;

        const validSortByOptions: SortByOption[] = ["oldest", "latest", "high-views", "low-views"];
        const sortBy = filters?.sortBy && validSortByOptions.includes(filters.sortBy as SortByOption)
          ? (filters.sortBy as SortByOption)
          : "latest";

        const response: any = await getPosts({ 
          userTierId: tierId,
          tags: tagsParam,
          search: filters?.search || undefined,
          sortBy,
          page: currentPage,
          size: pageSize
        });
        
        setPosts(response.data || []);
        setTotalItems(response.meta?.totalItems || 0);
        setTotalPages(response.meta?.totalPages || 1);

      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
        setTotalPages(1);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [tierId, filters, currentPage]); 

  const formattedPosts = posts.map((post :any)=> ({
    id: post.id,
    imgSrc: post.thumbUrl || post.mediaUrl,
    title: post.title,
    user: post.meta?.author?.nickname || 'Unknown user',
    date: new Date(post.meta?.createdAt || Date.now()).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }));

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
      }
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className='min-h-screen bg-background w-full'>
      {loading && currentPage === 1 ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <section className="px-4 md:px-10 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
            Posts
            </h2>
            
            {formattedPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {formattedPosts.map((post, index) => (
                  <PostCard key={post.id || index} {...post} />
                ))}
              </div>
            ) : (
              <div className="bg-cardBackground border border-border rounded-lg p-10 text-center">
                <p className="text-subtext">No posts available</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center space-y-4 pb-12">
                <div className="text-sm text-subtext">
                  Showing page {currentPage} of {totalPages} ({totalItems} posts total)
                </div>

                {loading && currentPage !== 1 && (
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                )}
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1 || loading}
                    className={`px-3 py-2 rounded border ${
                      currentPage === 1 || loading
                        ? 'bg-cardBackground text-subtext border-border/50 cursor-not-allowed'
                        : 'bg-cardBackground border-border hover:bg-background hover:border-primary'
                    }`}
                  >
                    Previous
                  </button>
              
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) => 
                      typeof page === 'number' ? (
                        <button
                          key={index}
                          onClick={() => goToPage(page)}
                          disabled={loading}
                          className={`w-10 h-10 flex items-center justify-center rounded ${
                            currentPage === page
                              ? 'bg-primary text-white'
                              : 'bg-cardBackground border border-border hover:bg-background hover:border-primary'
                          }`}
                        >
                          {page}
                        </button>
                      ) : (
                        <span key={index} className="px-1">
                          {page}
                        </span>
                      )
                    )}
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || loading}
                    className={`px-3 py-2 rounded border ${
                      currentPage === totalPages || loading
                        ? 'bg-cardBackground text-subtext border-border/50 cursor-not-allowed'
                        : 'bg-cardBackground border-border hover:bg-background hover:border-primary'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default Posts



