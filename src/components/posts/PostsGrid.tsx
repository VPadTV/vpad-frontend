'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, Image, Button, Pagination, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Chip } from '@nextui-org/react';
import { FaSearch, FaSortAmountDown, FaPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPosts, setPage, resetPostState } from '@/redux/features/postSlice';
import toast from 'react-hot-toast';
import { Post, PostSummary } from '@/types/post';
import { formatDistanceToNow } from 'date-fns';

export default function PostsGrid() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { posts, pagination, loading, error } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'high-views' | 'low-views'>('latest');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;

    const params = {
      page: pagination.page,
      size: pagination.size,
      sortBy,
      search: search || undefined,
      tags: activeTags.length > 0 ? activeTags.join(',') : undefined,
      creatorId: userId,
    };

    dispatch(getPosts(params));
  }, [dispatch, pagination.page, pagination.size, sortBy, activeTags, userId]);

  useEffect(() => {
    if (!userId) return;

    const timer = setTimeout(() => {
      if (pagination.page !== 1) {
        dispatch(setPage(1));
      } else {
        const params = {
          page: 1,
          size: pagination.size,
          sortBy,
          search: search || undefined,
          tags: activeTags.length > 0 ? activeTags.join(',') : undefined,
          creatorId: userId,
        };
        dispatch(getPosts(params));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, activeTags, dispatch, userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetPostState());
    }
  }, [error, dispatch]);

  const goToPost = (id: string) => {
    router.push(`/posts/${id}`);
  };

  const goToCreate = () => {
    router.push('/create');
  };

  const handleTagInput = (value: string) => {
    if (value.endsWith(',')) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !activeTags.includes(newTag)) {
        setActiveTags([...activeTags, newTag]);
      }
      setTagFilter('');
    } else {
      setTagFilter(value);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setActiveTags(activeTags.filter(tag => tag !== tagToRemove));
  };

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Posts</h1>

        <Button
          color="primary"
          startContent={<FaPlus />}
          onClick={goToCreate}
          className="mt-2 sm:mt-0"
        >
          Create Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-4 flex-1">
            <Input
              placeholder="Search my posts..."
              startContent={<FaSearch />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[150px]"
            />

            <Input
              placeholder="Add tags (separate with comma)..."
              value={tagFilter}
              onChange={(e) => handleTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tagFilter) {
                  handleTagInput(tagFilter + ',');
                }
              }}
              className="flex-1 min-w-[150px]"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  startContent={<FaSortAmountDown />}
                  className="whitespace-nowrap"
                >
                  {sortBy.charAt(0).toUpperCase() + sortBy.slice(1).replace('-', ' ')}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort options"
                onAction={(key) => setSortBy(key as any)}
                selectedKeys={[sortBy]}
              >
                <DropdownItem key="latest">Latest</DropdownItem>
                <DropdownItem key="oldest">Oldest</DropdownItem>
                <DropdownItem key="high-views">Most Views</DropdownItem>
                <DropdownItem key="low-views">Least Views</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {activeTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeTags.map((tag) => (
              <Chip
                key={tag}
                onClose={() => removeTag(tag)}
                variant="flat"
                color="primary"
                className="text-sm"
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {/* Post grid */}
      {loading && posts.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-xl text-gray-500">Loading your posts...</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-xl text-gray-500 mb-4">You haven't created any posts yet</p>
          <Button
            color="primary"
            onClick={goToCreate}
          >
            Create your first post
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post: PostSummary) => (
            <Card
              key={post.id}
              isPressable
              onPress={() => goToPost(post.id)}
              className="overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className='h-66'>
              <Image
                src={post.thumbUrl || post.mediaUrl}
                alt={post.title}
                radius="none"
                className=" w-full h-full object-cover"
              />
              </div>
              <CardFooter className="flex flex-col items-start p-3">
                <h2 className="font-bold text-lg line-clamp-1">{post.title}</h2>
                <div className="flex items-center gap-2 mt-2">
                  {post.meta?.author?.profilePhotoUrl && (
                    <Image
                      src={post.meta.author.profilePhotoUrl}
                      alt={post.meta.author.nickname}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium text-sm">{post.meta?.author?.nickname}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>{post.meta?.views || 0} views</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(post.meta?.createdAt || Date.now()), { addSuffix: true })}</span>
                </div>
                {post.meta?.tags && post.meta.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.meta.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-default-100 text-default-700 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.meta.tags.length > 3 && (
                      <span className="bg-default-100 text-default-700 text-xs px-2 py-1 rounded-full">
                        +{post.meta.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
                {post.meta?.series && (
                  <div className="mt-2">
                    <Chip
                      variant="flat"
                      color="secondary"
                      size="sm"
                    >
                      Series: {post.meta.series.name}
                    </Chip>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {posts.length > 0 && pagination.total > pagination.size && (
        <div className="flex justify-center mt-8">
          <Pagination
            total={Math.ceil(pagination.total / pagination.size)}
            initialPage={pagination.page}
            page={pagination.page}
            onChange={(page) => dispatch(setPage(page))}
          />
        </div>
      )}
    </div>
  );
}
