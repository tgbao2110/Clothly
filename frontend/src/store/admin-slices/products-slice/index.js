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

// PUT UpdateProduct thunk
const updateProduct = createAsyncThunk('product/update',
  async ({id, formData}, thunkAPI) => {
    try {
      const res = await api.put(`/admin/product/${id}`, formData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
)

//DELETE DeleteProduct thunk
const deleteProduct = createAsyncThunk('product/delete',
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/admin/product/${id}`)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
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
          }).addCase(uploadImage.fulfilled, (state) => {
            state.isLoading = false;
          }).addCase(uploadImage.rejected, (state) => {
            state.isLoading = false;
          } )
        //
        // GetAll states
        builder.addCase(getAllProducts.pending, state => {
          state.isLoading = true;
        }).addCase(getAllProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.products = action.payload.data;
        }).addCase(getAllProducts.rejected, state => {
          state.isLoading = false;
        })
        //
        // Update states
        builder.addCase(updateProduct.pending, (state) => {
          state.isLoading = true;
        }).addCase(updateProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          const i = state.products.findIndex(p => p._id === action.payload.data._id);
          if (i !== -1) state.products[i] = action.payload.data;
        }).addCase(updateProduct.rejected, (state) => {
          state.isLoading = false;
        })
        //
        // Delete states
        builder.addCase(deleteProduct.pending, (state) => {
          state.isLoading = true;
        }).addCase(deleteProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          const i = state.products.findIndex(p => p._id === action.payload.data._id);
          if (i !== -1) state.products.splice(i,1);
        }).addCase(deleteProduct.rejected, (state) => {
          state.isLoading = false;
        })
    }
})

export { uploadImage, createProduct, getAllProducts, updateProduct, deleteProduct}
export default AdminProductSlices.reducer