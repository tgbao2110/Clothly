import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsReducer from './admin-slices/products-slice'
import customerProductsReducer from './customer-slices/products-slice'
import cartReducer from './customer-slices/cart-slice'

const store = configureStore ({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        customerProducts: customerProductsReducer,
        cart: cartReducer,
    }
})

export default store