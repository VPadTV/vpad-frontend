import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  createSeries as apiCreateSeries,
  getSeries as apiGetSeries,
  updateSeries as apiUpdateSeries,
  deleteSeries as apiDeleteSeries,
  SeriesCreateRequest,
  SeriesUpdateRequest,
  Series
} from '@/utils/api/seriesApi';

interface SeriesState {
  seriesList: Series[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SeriesState = {
  seriesList: [],
  loading: false,
  error: null,
  success: false,
};

export const createSeries = createAsyncThunk(
  'series/create',
  async (seriesData: SeriesCreateRequest, { rejectWithValue }) => {
    try {
      const response = await apiCreateSeries(seriesData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create series');
    }
  }
);

export const getSeries = createAsyncThunk(
  'series/getMany',
  async (ownerId: string, { rejectWithValue }) => {
    try {
      const s = await apiGetSeries(ownerId);
      return s.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch series');
    }
  }
);

export const updateSeries = createAsyncThunk(
  'series/update',
  async ({ id, seriesData }: { id: string; seriesData: SeriesUpdateRequest }, { rejectWithValue }) => {
    try {
      await apiUpdateSeries(id, seriesData);
      return { id, ...seriesData };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update series');
    }
  }
);

export const deleteSeries = createAsyncThunk(
  'series/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiDeleteSeries(id);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to delete series');
    }
  }
);

export const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    resetSeriesState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSeries.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(getSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSeries.fulfilled, (state, action) => {
        state.seriesList = action.payload;
        state.loading = false;
      })
      .addCase(getSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const { id, name } = action.payload as { id: string; name: string };
        state.seriesList = state.seriesList.map(series => 
          series.id === id ? { ...series, name } : series
        );
      })
      .addCase(updateSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(deleteSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.seriesList = state.seriesList.filter(series => series.id !== action.payload);
      })
      .addCase(deleteSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSeriesState } = seriesSlice.actions;

export default seriesSlice.reducer;
