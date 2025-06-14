import {imageUploadUtil} from '../../helpers/cloudinary.js'

const handleImageUpload = async(req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = 'data' + req.file.mimetype + ';base64' + b64
        const result = await imageUploadUtil(url);

        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        console.log('Error uploading image: ',error)
        res.status(500).json({
            success: false,
            message: 'Error uploading image'
        })
    }
}

export {handleImageUpload}