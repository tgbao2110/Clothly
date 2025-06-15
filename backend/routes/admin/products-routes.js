import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import {
  handleImageUpload,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/products-controller.js";

const router = express.Router();

router.post('/upload-image', upload.single('my-file'), handleImageUpload)
router.post('/', createProduct)
router.get('/', getAllProducts)
router.put('/:id', upload.none(), updateProduct)
router.delete('/:id', deleteProduct)


export {router as adminProductsRouter}