import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    products: [],
    currentProduct: null
}

// GET GetFilteredProducts thunk
const getFilteredProducts = createAsyncThunk('/products/get-filtered',
  async (query, thunkAPI) => {
      try {
          const res = await api.get(`/customer/product?${query}`);
          return res.data;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data);
      }
  }
)

// GET GetProductById
const getProductById = createAsyncThunk('/product/get-by-id',
    async (id, thunkAPI) => {
        try {
            const res = await api.get(`/customer/product/${id}`)
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)

///// Slice /////
const CustomerProductSlice = createSlice({
    name: 'customerProducts',
    initialState,
    reducers:{},
    extraReducers: builder => {
        // GetFiltered states
        builder.addCase(getFilteredProducts.pending, state => {
            state.isLoading = true;
        }).addCase(getFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data;
        }).addCase(getFilteredProducts.rejected, state => {
            state.isLoading = false;
        })
        // GetById states
        builder.addCase(getProductById.pending, state => {
            state.isLoading = true;
        }).addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentProduct = action.payload.data;
        }).addCase(getProductById.rejected, state => {
            state.isLoading = false;
            state.currentProduct = null;
        })
    }
})

export { getFilteredProducts, getProductById }
export default CustomerProductSlice.reducer