import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    items: []
}

// POST addToCart thunk
const addToCart = createAsyncThunk('/cart/add',
  async({userId, productId, qty}, thunkAPI) => {
    console.log (`Adding product "${productId}" with qty "${qty}" to user "${userId}"`)
    try {
        const res = await api.post('/cart',{userId, productId, qty}, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

///// Slice /////
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{},
    extraReducers:{}
});

export { addToCart }
export default CartSlice.reducer