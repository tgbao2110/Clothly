import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    addresses: []
}

// POST createAddress thunk
const createAddress = createAsyncThunk('/address/create',
    async (formData, thunkAPI) => {
      try {
        const res = await api.post("/address/", formData, {
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

// GET getAllAddresses thunk
const getAllAddresses = createAsyncThunk('/address/get-all',
  async (userId, thunkAPI) => {
      try {
          const res = await api.get(`/address/${userId}`);
          return res.data;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response?.data);
      }
  }
)

// PUT updateAddress thunk
const updateAddress = createAsyncThunk('/address/update',
  async ({ userId, addressId, formData }, thunkAPI) => {
    console.log('Request '+ `/address/${userId}/${addressId}`)
      try {
          const res = await api.put(`/address/${userId}/${addressId}`,
            formData, {
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

//DELETE deleteAddress thunk
const deleteAddress = createAsyncThunk('address/delete',
  async ({userId, addressId}, thunkAPI) => {
    try {
      const res = await api.delete(`/address/${userId}/${addressId}`)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

///// Slice /////
const AddressSlices = createSlice({
    name: 'adminAddress',
    initialState,
    reducers:{},
    extraReducers: builder => {
        //
        // Create states
        builder.addCase(createAddress.pending, (state) => {
            state.isLoading = true;
          }).addCase(createAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addresses.push(action.payload.data);
          }).addCase(createAddress.rejected, (state) => {
            state.isLoading = false;
          });
        //
        // GetAll states
        builder.addCase(getAllAddresses.pending, state => {
          state.isLoading = true;
        }).addCase(getAllAddresses.fulfilled, (state, action) => {
          state.isLoading = false;
          state.addresses = action.payload.data;
        }).addCase(getAllAddresses.rejected, state => {
          state.isLoading = false;
        })
        //
        // Update states
        builder.addCase(updateAddress.pending, state => {
          state.isLoading = true;
        }).addCase(updateAddress.fulfilled, (state, action) => {
          state.isLoading = false;
          const i = state.addresses.findIndex(a => a._id === action.payload.data._id)
          if (i !== -1) state.addresses[i] = action.payload.data;
        }).addCase(updateAddress.rejected, state => {
          state.isLoading = false;
        })
        //
        // Delete states
        builder.addCase(deleteAddress.pending, (state) => {
          state.isLoading = true;
        }).addCase(deleteAddress.fulfilled, (state, action) => {
          state.isLoading = false;
          const i = state.addresses.findIndex(a => a._id === action.payload.data._id);
          if (i !== -1) state.addresses.splice(i,1);
        }).addCase(deleteAddress.rejected, (state) => {
          state.isLoading = false;
        })
    }
})

export { createAddress, getAllAddresses, updateAddress, deleteAddress }
export default AddressSlices.reducer