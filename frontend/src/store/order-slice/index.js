  import api from '@/lib/api'
  import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

  const initialState = {
      isLoading: false,
      allOrders: [],
      customerOrders: []
  }

  // POST createOrder thunk
  const createOrder = createAsyncThunk('/order/create',
      async (formData, thunkAPI) => {
          try {
              const res = await api.post('/order', formData, {
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

  // GET getOrdersByUser thunk
  const getOrdersByUser = createAsyncThunk('/order/get-by-user',
    async (userId, thunkAPI) => {
        try {
            const res = await api.get(`/order/${userId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )

  // GET getAllOrders thunk
  const getAllOrders = createAsyncThunk('/order/get-all',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/order/all');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )

  // PUT setStatus thunk
  const setOrderStatus = createAsyncThunk('/order/set-status',
    async({orderId, status}, thunkAPI) => {
      console.log('Request '+ `/order/${orderId}/${status}`)
      try {
        const res = await api.put(`/order/${orderId}/${status}`);
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  )

  const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Create states
      builder
        .addCase(createOrder.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.customerOrders.push(action.payload.data);
        })
        .addCase(createOrder.rejected, (state) => {
          state.isLoading = false;
        });
      // GetOrdersByUser states
      builder
        .addCase(getOrdersByUser.pending, (state) => {
          state.isLoading = true;
        }).addCase(getOrdersByUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.customerOrders = action.payload.data;
        }).addCase(getOrdersByUser.rejected, (state) => {
          state.isLoading = false;
        });
      // GetAllOrders states
      builder
        .addCase(getAllOrders.pending, (state) => {
          state.isLoading = true;
        }).addCase(getAllOrders.fulfilled, (state, action) => {
          state.isLoading = false;
          state.allOrders = action.payload.data;
        }).addCase(getAllOrders.rejected, (state) => {
          state.isLoading = false;
        });
      builder
        .addCase(setOrderStatus.pending, (state) => {
          state.isLoading = true;
        }).addCase(setOrderStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.allOrders = state.allOrders.map(order => 
            order._id === action.payload.data._id ?
              action.payload.data :
              order
          );
        }).addCase(setOrderStatus.rejected, (state) => {
          state.isLoading = false;
        });
    },
  });

  export { createOrder, getOrdersByUser, getAllOrders, setOrderStatus }
  export default OrderSlice.reducer
