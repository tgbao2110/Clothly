import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsReducer from './admin-slices/products-slice'
import adminBannersReducer from './admin-slices/banners-slice'
import customerProductsReducer from './customer-slices/products-slice'
import cartReducer from './customer-slices/cart-slice'
import addressReducer from './customer-slices/address-slice'
import orderReducer from './order-slice'

const store = configureStore ({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        adminBanners: adminBannersReducer,
        customerProducts: customerProductsReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer
    }
})

export default store