//@ts-nocheck
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '@/types/post';
import {
  createComment as apiCreateComment,
  getComments as apiGetComments,
  updateComment as apiUpdateComment,
  deleteComment as apiDeleteComment,
  CommentCreateRequest,
  CommentEditRequest,
  CommentGetManyRequest
} from '@/utils/api/commentApi';
import { adaptCommentsFromApi } from '@/utils/adapters/commentAdapter';

export interface CommentState {
  comments: Comment[];
  childComments: Record<string, Comment[]>; 
  loading: boolean;
  childrenLoading: Record<string, boolean>;
  error: string | null;
  success: boolean;
  pagination: {
    total: number;
    page: number;
    size: number;
  };
}

const initialState: CommentState = {
  comments: [],
  childComments: {},
  loading: false,
  childrenLoading: {},
  error: null,
  success: false,
  pagination: {
    total: 0,
    page: 1,
    size: 10,
  }
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (params: CommentGetManyRequest, { rejectWithValue }) => {
    try {
      const apiParams = {
        ...params,
        sortBy: params.sortBy === 'latest' ? 'latest' : params.sortBy
      };
      
      const response = await apiGetComments(apiParams);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch comments');
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData: CommentCreateRequest, { rejectWithValue }) => {
    try {
      const response = await apiCreateComment(commentData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to add comment');
    }
  }
);

export const editComment = createAsyncThunk(
  'comments/editComment',
  async (commentData: CommentEditRequest, { rejectWithValue }) => {
    try {
      const response = await apiUpdateComment(commentData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to edit comment');
    }
  }
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiDeleteComment(id);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete comment');
    }
  }
);

export const fetchChildComments = createAsyncThunk(
  'comments/fetchChildComments',
  async ({ parentId, postId, sortBy = 'latest' }: { parentId: string, postId: string, sortBy?: 'latest' | 'oldest' }, { rejectWithValue }) => {
    try {
      const response = await apiGetComments({
        postId,
        parentId,
        sortBy,
        page: 1,
        size: 50
      });
      return { parentId, response };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch child comments');
    }
  }
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetCommentState: (state) => {
      state.error = null;
      state.success = false;
    },
    clearComments: (state) => {
      state.comments = [];
      state.childComments = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = adaptCommentsFromApi(action.payload.data);
        state.pagination = {
          total: action.payload.meta?.total || 0,
          page: action.payload.meta?.page || 1,
          size: action.payload.meta?.size || 10,
        };
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add comment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Edit comment
      .addCase(editComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editComment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete comment
      .addCase(removeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchChildComments.pending, (state, action) => {
        const parentId = action.meta.arg.parentId;
        state.childrenLoading = { ...state.childrenLoading, [parentId]: true };
        state.error = null;
      })
      .addCase(fetchChildComments.fulfilled, (state, action) => {
        const { parentId, response } = action.payload;
        state.childrenLoading = { ...state.childrenLoading, [parentId]: false };
        state.childComments = { 
          ...state.childComments, 
          [parentId]: adaptCommentsFromApi(response.data) 
        };
      })
      .addCase(fetchChildComments.rejected, (state, action) => {
        const parentId = action.meta.arg.parentId;
        state.childrenLoading = { ...state.childrenLoading, [parentId]: false };
        state.error = action.payload as string;
      });
  },
});

export const { resetCommentState, clearComments } = commentSlice.actions;

export default commentSlice.reducer;
