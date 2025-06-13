import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import { authRouter } from "./routes/auth/auth-routes.js";
import { adminProductsRouter } from "./routes/admin/products-routes.js";

dotenv.config()

//create db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY"))
  .catch((error) => console.error("ERROR CONNECTING TO MONGODB: ", error));

const app = express();
const port = process.env.PORT || "5001";

//Middlewares
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

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter)

app.listen(port, () => {console.log("Server is running on port ",port)})
