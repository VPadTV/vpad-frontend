import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/admin';
import { 
  getAdminUsers, 
  toggleUserAdmin, 
  banUser, 
  BanUserRequest, 
  AdminUserRequest 
} from '@/utils/api/adminApi';

interface AdminState {
  users: User[];
  pagination: {
    total: number;
    page: number;
    size: number;
    pages: number;
  };

  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AdminState = {
  users: [],
  pagination: {
    total: 0,
    page: 1,
    size: 10,
    pages: 1,
  },
  loading: false,
  error: null,
  success: false,
};


export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminUsers();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch admin users');
    }
  }
);

export const updateUserAdmin = createAsyncThunk(
  'admin/updateUserAdmin',
  async (request: AdminUserRequest, { rejectWithValue }) => {
    try {
      return await toggleUserAdmin(request);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update user admin status');
    }
  }
);

export const updateUserBan = createAsyncThunk(
  'admin/updateUserBan',
  async (request: BanUserRequest, { rejectWithValue }) => {
    try {
      return await banUser(request);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update user ban status');
    }
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.error = null;
      state.success = false;
    },
    setAdminPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          size: action.payload.size,
          pages: action.payload.pages,
        };
        state.loading = false;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateUserAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAdmin.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map(user => 
          user.id === updatedUser.id ? { ...user, admin: updatedUser.admin } : user
        );
        
        
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUserAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle updateUserBan
      .addCase(updateUserBan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserBan.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map(user => 
          user.id === updatedUser.id 
            ? { ...user, banned: updatedUser.banned, banTimeout: updatedUser.banTimeout } 
            : user
        );
        
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUserBan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAdminState, setAdminPage } = adminSlice.actions;

export default adminSlice.reducer;
