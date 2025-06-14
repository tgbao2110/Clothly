import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsReducer from './admin-slices/products-slice'

const store = configureStore ({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer
    }
})

export default store