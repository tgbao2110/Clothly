import express from "express";
import { handleImageUpload } from "../../controllers/admin/products-controller.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

router.post('/upload-image', upload.single('my-file'), handleImageUpload)

export {router as adminProductsRouter}