import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Tier } from '@/types/tier';
import { 
  createTier as apiCreateTier,
  getTiers as apiGetTiers,
  updateTier as apiUpdateTier,
  deleteTier as apiDeleteTier,
  TierCreateRequest,
  TierUpdateRequest
} from '@/utils/api/tierApi';

interface TierState {
  tiers: Tier[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TierState = {
  tiers: [],
  loading: false,
  error: null,
  success: false,
};

export const createTier = createAsyncThunk(
  'tiers/create',
  async (tierData: TierCreateRequest, { rejectWithValue }) => {
    try {
      const response = await apiCreateTier(tierData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create tier');
    }
  }
);

export const getTiers = createAsyncThunk(
  'tiers/getMany',
  async (creatorId: string, { rejectWithValue }) => {
    try {
      const response = await apiGetTiers(creatorId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch tiers');
    }
  }
);

export const updateTier = createAsyncThunk(
  'tiers/update',
  async ({ id, tierData }: { id: string; tierData: TierUpdateRequest }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateTier(id, tierData);
      return { id, ...response, ...tierData };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update tier');
    }
  }
);

export const deleteTier = createAsyncThunk(
  'tiers/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiDeleteTier(id);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete tier');
    }
  }
);

export const tierSlice = createSlice({
  name: 'tiers',
  initialState,
  reducers: {
    resetTierState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create tier
      .addCase(createTier.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTier.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createTier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get tiers
      .addCase(getTiers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTiers.fulfilled, (state, action) => {
        state.tiers = action.payload.tiers;
        state.loading = false;
      })
      .addCase(getTiers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update tier
      .addCase(updateTier.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTier.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const { id, name } = action.payload as { id: string; name: string };
        state.tiers = state.tiers.map(tier => 
          tier.id === id ? { ...tier, name } : tier
        );
      })
      .addCase(updateTier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete tier
      .addCase(deleteTier.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTier.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tiers = state.tiers.filter(tier => tier.id !== action.payload);
      })
      .addCase(deleteTier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTierState } = tierSlice.actions;

export default tierSlice.reducer;
