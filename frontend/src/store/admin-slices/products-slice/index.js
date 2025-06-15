import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    products: []
}

// POST UploadImage thunk
const uploadImage = createAsyncThunk(
  "/products/upload-image",
  async (image, thunkAPI) => {
    try {
      const data = new FormData();
      data.append("my-file", image);

      const res = await api.post("/admin/product/upload-image", data);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

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

// GET GetAllProducts thunk
const getAllProducts = createAsyncThunk('/products/get-all',
    async (_, thunkAPI) => {
        try {
            const res = await api.get("/admin/product/");
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
        //
        // ImageUpload states
        builder.addCase(uploadImage.pending, (state) => {
            state.isLoading = true;
          })
        //
        // GetAll states
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
          state.products = action.payload.data
        })
    }
})

export { uploadImage, createProduct, getAllProducts }
export default AdminProductSlices.reducer