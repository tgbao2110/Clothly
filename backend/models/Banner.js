import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
        image: String,
        title: String,
    }
);

export const Banner = mongoose.model("Banner", bannerSchema)