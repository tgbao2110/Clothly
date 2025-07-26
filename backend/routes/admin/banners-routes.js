import express from "express";
import { 
  createBanner,
  getAllBanners,
  deleteBanner
} from '../../controllers/admin/banners-controller.js';

const router = express.Router();

router.post('/', createBanner);
router.get('/', getAllBanners);
router.delete('/', deleteBanner);

export {router as adminBannerRoutes}