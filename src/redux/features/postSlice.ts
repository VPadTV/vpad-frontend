import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostSummary, PaginatedPosts } from '@/types/post';
import {
  createPost as apiCreatePost,
  getPosts as apiGetPosts,
  getPost as apiGetPost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
  PostCreateRequest,
  PostUpdateRequest,
  PostsQueryParams
} from '@/utils/api/postApi';
import { setVote as apiSetVote, VoteSetRequest } from '@/utils/api/voteApi';
import { adaptPostFromApi } from '@/utils/adapters/postAdapter';

interface PostState {
  currentPost: Post | null;
  posts: PostSummary[];
  pagination: {
    total: number;
    page: number;
    size: number;
  };
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PostState = {
  currentPost: null,
  posts: [],
  pagination: {
    total: 0,
    page: 1,
    size: 20,
  },
  loading: false,
  error: null,
  success: false,
};

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData: PostCreateRequest, { rejectWithValue }) => {
    try {
      const response = await apiCreatePost(postData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create post');
    }
  }
);

export const getPosts = createAsyncThunk(
  'posts/getMany',
  async (params: PostsQueryParams, { rejectWithValue }) => {
    try {
      const response = await apiGetPosts(params);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch posts');
    }
  }
);

export const getPost = createAsyncThunk(
  'posts/get',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiGetPost(id);
      return adaptPostFromApi(response);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, postData }: { id: string; postData: PostUpdateRequest }, { rejectWithValue }) => {
    try {
      const response = await apiUpdatePost(id, postData);
      return { id, ...response };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiDeletePost(id);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete post');
    }
  }
);

export const votePost = createAsyncThunk(
  'posts/vote',
  async (voteData: VoteSetRequest, { rejectWithValue }) => {
    try {
      await apiSetVote(voteData);
      return { postId: voteData.postId, vote: voteData.vote };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to vote on post');
    }
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    resetPostState: (state) => {
      state.error = null;
      state.success = false;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const paginatedPosts = action.payload as PaginatedPosts;
        state.posts = paginatedPosts.data;
        state.pagination = {
          total: paginatedPosts?.total || 0,
          page: paginatedPosts?.currentPage || 1,
          size: paginatedPosts?.total,
        };
        state.loading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get single post
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.currentPost = action.payload as Post;
        state.loading = false;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(votePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(votePost.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, vote } = action.payload as { postId: string; vote: number };

        if (state.currentPost && state.currentPost.id === postId) {
          if (!state.currentPost.meta) state.currentPost.meta = {} as any;

          const oldVote = state.currentPost.meta.myVote || 0;
          state.currentPost.meta.myVote = vote;

          if (vote === 1 && oldVote !== 1) {
            state.currentPost.meta.likes = (state.currentPost.meta.likes || 0) + 1;
            if (oldVote === -1) {
              state.currentPost.meta.dislikes = Math.max((state.currentPost.meta.dislikes || 0) - 1, 0);
            }
          } else if (vote === -1 && oldVote !== -1) {
            state.currentPost.meta.dislikes = (state.currentPost.meta.dislikes || 0) + 1;
            if (oldVote === 1) {
              state.currentPost.meta.likes = Math.max((state.currentPost.meta.likes || 0) - 1, 0);
            }
          } else if (vote === 0) {
            if (oldVote === 1) {
              state.currentPost.meta.likes = Math.max((state.currentPost.meta.likes || 0) - 1, 0);
            } else if (oldVote === -1) {
              state.currentPost.meta.dislikes = Math.max((state.currentPost.meta.dislikes || 0) - 1, 0);
            }
          }
        }

        state.posts = state.posts.map(post => {
          if (post.id === postId && post.meta) {
            const oldVote = post.meta.myVote || 0;
            return {
              ...post,
              meta: {
                ...post.meta,
                myVote: vote,
                likes: vote === 1 && oldVote !== 1
                  ? (post.meta.likes || 0) + 1
                  : oldVote === 1 && vote !== 1
                    ? Math.max((post.meta.likes || 0) - 1, 0)
                    : post.meta.likes,
                dislikes: vote === -1 && oldVote !== -1
                  ? (post.meta.dislikes || 0) + 1
                  : oldVote === -1 && vote !== -1
                    ? Math.max((post.meta.dislikes || 0) - 1, 0)
                    : post.meta.dislikes
              }
            };
          }
          return post;
        });
      })
      .addCase(votePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPost, resetPostState, setPage } = postSlice.actions;

export default postSlice.reducer;
