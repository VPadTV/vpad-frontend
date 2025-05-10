import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSub as apiCreateSub, SubCreateRequest } from '@/utils/api/subApi';
import toast from 'react-hot-toast';

interface SubState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SubState = {
  loading: false,
  error: null,
  success: false,
};

export const createSub = createAsyncThunk(
  'sub/create',
  async (data: SubCreateRequest, { rejectWithValue }) => {
    try {
      const response = await apiCreateSub(data);
      toast.success('Subscribed successfully!')
      return response;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message); 
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create subscription');
    }
  }
);

export const subSlice = createSlice({
  name: 'sub',
  initialState,
  reducers: {
    resetSubState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSub.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSub.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createSub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubState } = subSlice.actions;

export default subSlice.reducer;
