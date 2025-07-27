import express from "express";
import { 
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress
} from '../../controllers/customer/address-controller.js';

const router = express.Router();

router.post('/', createAddress);
router.get('/:userId', getAllAddresses);
router.put('/:userId/:addressId', updateAddress)
router.delete('/:userId/:addressId', deleteAddress);

export {router as addressRoutes}