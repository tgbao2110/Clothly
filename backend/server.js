import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import path from "path";

import { authRouter } from "./routes/auth/auth-routes.js";
import { adminProductsRouter } from "./routes/admin/products-routes.js";
import { adminBannerRoutes } from "./routes/admin/banners-routes.js";
import { customerProductsRouter } from "./routes/customer/product-routes.js";
import { cartRouter } from "./routes/customer/cart-routes.js";
import { addressRouter } from "./routes/customer/address-routes.js";
import { orderRouter } from "./routes/order/order-routes.js";

dotenv.config()

//create db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY"))
  .catch((error) => console.error("ERROR CONNECTING TO MONGODB: ", error));

const app = express();
const port = process.env.PORT || "5001";
const __dirname = path.resolve();

//Middlewares
if(process.env.NODE_ENV === "development"){
    app.use(
        cors({
            origin: 'http://localhost:5173',
            methods: ['GET','POST',"PUT",'DELETE'],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'Cache-Control',
                'Expires',
                'Pragma'
            ],
            credentials: true
        })
    );
}
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
});


app.use('/api/auth', authRouter);
app.use('/api/admin/product', adminProductsRouter);
app.use('/api/admin/banner', adminBannerRoutes);
app.use('/api/customer/product', customerProductsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.listen(port, () => {console.log("Server is running on port ",port)});
