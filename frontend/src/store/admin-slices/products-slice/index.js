import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
    products: []
}

// POST CreateProduct thunk
const createProduct = createAsyncThunk('/products/create',
    async (formData, thunkAPI) => {
        try {
            const res = await api.post("/admin/product/", formData, {
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


///// Slice /////
const AdminProductSlices = createSlice({
    name: 'adminProducts',
    initialState,
    reducers:{},
    extraReducers: builder => {
        //
        // Create states
        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true;
          }).addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products.push(action.payload.data);
          }).addCase(createProduct.rejected, (state) => {
            state.isLoading = false;
          });
    }
})

export { createProduct }
export default AdminProductSlices.reducer