import { Banner } from "../../models/Banner.js";
import { imageDeleteUtil } from "../../helpers/cloudinary.js"
//
//
// CREATE
const createBanner = async(req, res) => {
    try {
        const newBanner = new Banner(req.body);
        await newBanner.save();

        res.status(201).json({
            success: true,
            data: newBanner,
            message: "Banner added successfully"
        })
    } catch (error) {
        console.log("Error adding banner: ", error)
        res.status(500).json({
            success: false,
            message: "Error adding banner"
        })
    }
}
//
//
// GET ALL
const getAllBanners = async(req, res) => {
    try {
        const banners = await Banner.find({});

        res.status(200).json({
            success: true,
            data: banners
        })
    } catch (error) {
        console.log("Error fetching banners: ", error)
        res.status(500).json({
            success: false,
            message: "Error fetching banners"
        })
    }
}
//
//
// DELETE
const deleteBanner = async(req, res) => {
    try {
        const {id} = req.params;
        const banner = await Banner.findByIdAndDelete(id);

        if (!banner)
        {
            res.status(404).json({
                success: false,
                message: `Banner ${id} not found`
            })
            return
        }

        await imageDeleteUtil(banner.image);

        res.status(200).json({
            success: true,
            message: "Banner deleted successfully",
            data: banner
        })
    } catch (error) {
        console.log("Error deleting banner: ", error)
        res.status(500).json({
            success: false,
            message: "Error deleting banner"
        })
    }
}
export { 
  createBanner,
  getAllBanners,
  deleteBanner 
}