import express from "express";
import { handleImageUpload } from "../../controllers/admin/products-controller";
import { upload } from "../../helpers/cloudinary";

const router = express.Router();

router.post('/upload-image', upload.single('my-file'), handleImageUpload)

export {router as adminProductsRouter}