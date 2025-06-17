import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    products: []
}

// GET GetFilteredProducts thunk
const getFilteredProducts = createAsyncThunk('/products/get-filtered',
  async (_, thunkAPI) => {
      try {
          const res = await api.get("/customer/product/");
          return res.data;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data);
      }
  }
)

///// Slice /////
const CustomerProductSlices = createSlice({
    name: 'customerProducts',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getFilteredProducts.pending, state => {
            state.isLoading = true;
        }).addCase(getFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data;
        }).addCase(getFilteredProducts.rejected, state => {
            state.isLoading = false;
        })
    }
})

export { getFilteredProducts }
export default CustomerProductSlices.reducer