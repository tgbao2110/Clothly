import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    banners: []
}

// POST CreateBanner thunk
const createBanner = createAsyncThunk('/banners/create',
    async (formData, thunkAPI) => {
        try {
            const res = await api.post("/admin/banner/", formData, {
              headers: {
                "Content-Type": "application/json"
              }
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

// GET GetAllBanners thunk
const getAllBanners = createAsyncThunk('/banners/get-all',
  async (_, thunkAPI) => {
      try {
          const res = await api.get("/admin/banner/");
          return res.data;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data);
      }
  }
)

//DELETE DeleteBanner thunk
const deleteBanner = createAsyncThunk('banner/delete',
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/admin/banner/${id}`)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

///// Slice /////
const AdminBannerSlices = createSlice({
    name: 'adminBanners',
    initialState,
    reducers:{},
    extraReducers: builder => {
        //
        // Create states
        builder.addCase(createBanner.pending, (state) => {
            state.isLoading = true;
          }).addCase(createBanner.fulfilled, (state, action) => {
            state.isLoading = false;
            state.banners.push(action.payload.data);
          }).addCase(createBanner.rejected, (state) => {
            state.isLoading = false;
          });
        //
        // GetAll states
        builder.addCase(getAllBanners.pending, state => {
          state.isLoading = true;
        }).addCase(getAllBanners.fulfilled, (state, action) => {
          state.isLoading = false;
          state.banners = action.payload.data;
        }).addCase(getAllBanners.rejected, state => {
          state.isLoading = false;
        })
        //
        // Delete states
        builder.addCase(deleteBanner.pending, (state) => {
          state.isLoading = true;
        }).addCase(deleteBanner.fulfilled, (state, action) => {
          state.isLoading = false;
          const i = state.banners.findIndex(p => p._id === action.payload.data._id);
          if (i !== -1) state.banners.splice(i,1);
        }).addCase(deleteBanner.rejected, (state) => {
          state.isLoading = false;
        })
    }
})

export { createBanner, getAllBanners, deleteBanner }
export default AdminBannerSlices.reducer