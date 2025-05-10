//@ts-nocheck
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/post'; 
import {
  getUsers as apiGetUsers,
  getUserProfile as apiGetUserProfile,
  searchUsersByUsername as apiSearchUsersByUsername,
  UsersQueryParams,
  PaginatedUsers,
} from '@/utils/api/userApi';
import { UserProfile } from '@/types/Util';

interface UserState {
  currentUserProfile: UserProfile | null;
  users: User[];
  searchResults: User[];
  pagination: {
    total: number;
    page: number;
    size: number;
  };
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  currentUserProfile: null,
  users: [],
  searchResults: [],
  pagination: {
    total: 0,
    page: 1,
    size: 50, 
  },
  loading: false,
  error: null,
  success: false,
};

export const getUsers = createAsyncThunk(
  'users/getMany',
  async (params: UsersQueryParams, { rejectWithValue }) => {
    try {
      const validParams = {
        ...params,
        page: Math.max(1, params.page || 1)
      };
      
      const response = await apiGetUsers(validParams);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'users/getProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await apiGetUserProfile(userId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch user profile');
    }
  }
);

export const searchUsersByUsername = createAsyncThunk(
  'users/searchByUsername',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await apiSearchUsersByUsername(username);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to search users');
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearCurrentUserProfile: (state) => {
      state.currentUserProfile = null;
    },
    resetUserState: (state) => {
      state.error = null;
      state.success = false;
    },
    setUserPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = Math.max(1, action.payload);
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        const paginatedUsers = action.payload as PaginatedUsers;
        state.users = paginatedUsers.data;
        
        const calculatedTotal = paginatedUsers.meta.total > 0 
          ? paginatedUsers.meta.total 
          : paginatedUsers.data.length;
        
        state.pagination = {
          total: calculatedTotal,
          page: paginatedUsers.meta.page || 1,
          size: paginatedUsers.meta.size || 50,
        };
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.currentUserProfile = action.payload;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchUsersByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsersByUsername.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(searchUsersByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentUserProfile, resetUserState, setUserPage, clearSearchResults } = userSlice.actions;

export default userSlice.reducer;
