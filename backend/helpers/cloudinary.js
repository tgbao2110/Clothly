import cloudinary from 'cloudinary'
import multer from 'multer'

cloudinary.config({
    cloud_name: 'dxpkpxyme',
    api_key: '823253959443939',
    api_secret: 'ifD283Zo53xCxE_a9BvaZt81b78',
})

const storage = new multer.memoryStorage();

const handleImageUpload = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        folder: "products",
        resource_type: "auto"
    });
    return result;
}

const getPublicIdFromUrl = (url) => {
    // Get behind "upload"
    const segment = url.split("/upload/")[1]; 
    if (!segment) return null;

    // Remove "v123456789/"
    const parts = segment.split('/');
    const isVersioned = parts[0].startsWith('v') && !isNaN(Number(parts[0].slice(1)));

    const relevantParts = isVersioned ? parts.slice(1) : parts;

    // Join
    const publicIdWithExt = relevantParts.join('/');

    // Remove extension ".avif"
    const publicId = publicIdWithExt.split('.')[0];

    return publicId;
};

const deleteImage = async url => {
    const publicId = getPublicIdFromUrl(url);
    console.log("url to delete: ", url)
    console.log("id tod delete: ", publicId)
    if (!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId, {resource_type: 'image'})
    } catch (error) {
        console.log('Error deleting image: ', error)
    }
}

const upload = multer({storage});

export {upload, handleImageUpload as imageUploadUtil, deleteImage as imageDeleteUtil}