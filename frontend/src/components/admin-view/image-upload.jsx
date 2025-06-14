import { CloudUpload, File, XIcon } from "lucide-react";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useEffect, useState } from "react";
import api from "@/lib/api";

const ProductImageUpload = ({ image, setImage, imageUrl, setImageUrl }) => {

    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDragOver = e => {
        setIsDraggingOver (true);
        e.preventDefault()
    }

    const handleDragLeave = e => {
        setIsDraggingOver (false);
        e.preventDefault()
    }

    const handleDrop = e => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0];
        droppedFile && setImage(droppedFile)
    }

    const handleImageChange = e => {
        const selectedImage = e.target.files?.[0];
        console.log( 'selected: ',selectedImage)
        selectedImage && setImage(selectedImage);
    }

    const handleRemoveImage = () => {
        setImage(null);
    }

    const uploadImgToCloudinary = async () => {
        const data = new FormData();
        data.append('my-file', image);
        const res = await api.post('/admin/products/upload-image');
        console.log('Image Data: ', res.data);
        if (res?.data?.success) setImageUrl(res.data,result.url);
    }

    useEffect(() => {
        if(image !== null) uploadImgToCloudinary()
    }, [image])


  return (
    <div className="w-full max-w-md mx-auto px-5">
      {/* ==== Label ==== */}
      <Label className="mb-2">Upload Image</Label>

      <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        {/* ==== Input ==== */}
        <Input 
            id="image" 
            type="file" 
            className="hidden" 
            onChange={handleImageChange}
        />

        {/* ==== Image Preview & DragnDrop Label ==== */}
        {   
            image ? 
            /* If img uploaded then show preview  */
            <div className="flex justify-between items-center p-4 mt-4
                text-muted-foreground
                border-2 rounded-lg"
            >
                <div className="flex items-center">
                    <File className="mr-2"/>
                </div>
                <p>
                    {image.name}
                </p>
                <XIcon 
                    className="text-muted-foreground hover:text-foreground w-4 h-4"
                    onClick={handleRemoveImage}
                />
            </div> 
            :
            /* Else show drag & drop  */
            <Label 
                htmlFor = 'image'
                className={`flex flex-col items-center justify-center h-32 mt-4 cursor-pointer
                text-muted-foreground
                border-2 border-dashed rounded-lg
                ${isDraggingOver ? 'bg-accent' : 'bg-background'}`}
            >
                <CloudUpload/>
                <span>
                    {
                        isDraggingOver ?
                        'Drop here' :
                        'Drag & drop or click to upload'
                    }
                </span>
            </Label>
        }
      </div>
    </div>
  );
};
export default ProductImageUpload