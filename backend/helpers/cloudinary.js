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
        resource_type: 'auto'
    })

    return result;
}

const upload = multer({storage});

export {upload, handleImageUpload as imageUploadUtil}