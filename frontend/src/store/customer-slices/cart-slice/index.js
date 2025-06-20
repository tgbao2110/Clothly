import api from "@/lib/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  itemsCount: parseInt(localStorage.getItem("itemsCount")) || 0
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

// GET getCartItems thunk
const getCartItems = createAsyncThunk('/cart/get',
    async(userId, thunkAPI) => {
        try {
            const res = await api.get(`/cart/${userId}`);
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
    extraReducers: (builder => {
        // addToCart states
        builder.addCase(addToCart.pending, state => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload.data;
            state.itemsCount = action.payload.data.length;
            localStorage.setItem("cartItems", JSON.stringify(state.items));
            localStorage.setItem("itemsCount", JSON.stringify(state.itemsCount));
        }).addCase(addToCart.rejected, state => {
            state.isLoading = false;
        })
        // getCartItems states
        builder.addCase(getCartItems.pending, state => {
            state.isLoading = true;
        }).addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload.data;
            state.itemsCount = action.payload.data.length;
            localStorage.setItem("cartItems", JSON.stringify(state.items));
            localStorage.setItem("itemsCount", JSON.stringify(state.itemsCount));
        }).addCase(getCartItems.rejected, state => {
            state.isLoading = false;
        })
    })
});

export { addToCart, getCartItems }
export default CartSlice.reducer