import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types/Util';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/Auth';
import { fetchApi } from '@/utils/api';
import { UserEditRequest, updateUserProfile as apiUpdateUserProfile } from '@/utils/api/userApi';
import toast from 'react-hot-toast';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  updateSuccess: boolean;
  error: string | null;
  redirectUrl: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  updateSuccess: false,
  error: null,
  redirectUrl: null,
};

export const loginUser = createAsyncThunk<AuthResponse, LoginRequest>(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetchApi<AuthResponse>('/user/login', {
        method: 'POST',
        params: {
          emailOrUsername: credentials.emailOrUsername,
          password: credentials.password,
        },
        headers: credentials.headers as Record<string, string>,
      });
      
      if (response.id) {
        await dispatch(fetchUserDetails(response.id));
      }
      
      toast.success('Signed in successfully!');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to login');
        return rejectWithValue(error.message);
      }
      toast.error('Failed to login');
      return rejectWithValue('Failed to login');
    }
  }
);

export const fetchUserDetails = createAsyncThunk<UserProfile, string>(
  'auth/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchApi<UserProfile>(`/user/${userId}`, {
        method: 'GET',
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to fetch user details');
        return rejectWithValue(error.message);
      }
      toast.error('Failed to fetch user details');
      return rejectWithValue('Failed to fetch user details');
    }
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterRequest>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetchApi<AuthResponse>('/user/register', {
        method: 'POST',
        params: {
          username: userData.username,
          nickname: userData.nickname,
          email: userData.email,
          password: userData.password,
          about: userData.about,
        },
        headers: userData.headers as Record<string, string>,
      });
      toast.success('Account created successfully!');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to register');
        return rejectWithValue(error.message);
      }
      toast.error('Failed to register');
      return rejectWithValue('Failed to register');
    }
  }
);

export const updateUserProfile = createAsyncThunk<UserProfile, { userId: string; userData: UserEditRequest }>(
  'auth/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      await apiUpdateUserProfile(userId, userData);
      const response = await fetchApi<UserProfile>(`/user/${userId}`, {
        method: 'GET',
      });
      toast.success('Profile updated successfully!');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to update profile');
        return rejectWithValue(error.message);
      }
      toast.error('Failed to update profile');
      return rejectWithValue('Failed to update user profile');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.redirectUrl = '/'; 
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      
      if (typeof window !== 'undefined') {
        if (state.user?.admin) {
          document.cookie = `isAdmin=${state.user.admin}; path=/; max-age=${60*60*24*30}; SameSite=Lax`;
        }
        document.cookie = `token=${action.payload}; path=/; max-age=${60*60*24*30}; SameSite=Lax`;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      
      if (typeof window !== 'undefined') {
        document.cookie = "isAdmin=; path=/; max-age=0; SameSite=Lax";
        document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
        toast.success('Logged out successfully');
      }
    },
    updateUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    setRedirectUrl: (state, action: PayloadAction<string | null>) => {
      state.redirectUrl = action.payload;
    },
    clearRedirectUrl: (state) => {
      state.redirectUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.redirectUrl = '/'; 
        if (typeof window !== 'undefined') {
          document.cookie = `token=${action.payload.token}; path=/; max-age=${60*60*24*30}; SameSite=Lax`;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        if (typeof window !== 'undefined' && action.payload.admin) {
          document.cookie = `isAdmin=${action.payload.admin}; path=/; max-age=${60*60*24*30}; SameSite=Lax`;
        }
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.redirectUrl = '/';
        
        if (typeof window !== 'undefined') {
          document.cookie = `token=${action.payload.token}; path=/; max-age=${60*60*24*30}; SameSite=Lax`;
          if (action.payload.user.admin) {
            document.cookie = `isAdmin=${action.payload.user.admin}; path=/; max-age=${60*60*24*30}; SameSite=Lax`;
          }
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.updateSuccess = false;
      });
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser, 
  setToken, 
  resetUpdateSuccess,
  setRedirectUrl,
  clearRedirectUrl
} = authSlice.actions;

export default authSlice.reducer;
