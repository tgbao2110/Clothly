import { useEffect, useState } from "react";

import { CloudUpload, File, XIcon } from "lucide-react";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useSelector } from "react-redux";

const ProductImageUpload = ({ image, setImage, previewUrl, setPreviewUrl, productId }) => {

    const products = useSelector(state => state.adminProducts.products)
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
        setPreviewUrl(null);
    }

    useEffect(() => {
      if (image) {
        const blob = URL.createObjectURL(image);
        setPreviewUrl(blob);
        return () => URL.revokeObjectURL(blob);
      }

      if (productId) {
        const found = products.find((p) => p._id === productId);
        if (found?.image) setPreviewUrl(found.image);
        else setPreviewUrl(null);
      } else {
        setPreviewUrl(null);
      }
    }, [image, productId, products]);



  return (
    <div className="w-full max-w-md mx-auto px-5">
      {/* ==== Label ==== */}
      <Label className="mb-2">Upload Image</Label>

      <div>
        {/* ==== Input ==== */}
        <Input 
            id="image" 
            type="file" 
            className="hidden" 
            onChange={handleImageChange}
        />

        {/* ==== Image Preview & DragnDrop Label ==== */}
        {   
            (image || previewUrl) ? 
            /* If img uploaded then show preview  */
            (
                <div className="flex-col gap-2">
                    <div className="flex justify-between items-center p-4 mt-4
                        text-muted-foreground
                        border-2 rounded-lg"
                    >
                        <div className="flex items-center">
                            <File className="mr-2"/>
                        </div>
                        <p>
                            {image?.name}
                        </p>
                        <XIcon 
                            className="text-muted-foreground hover:text-foreground w-4 h-4"
                            onClick={handleRemoveImage}
                        />
                    </div>
                    <img
                        src={previewUrl || 'preview.png'}
                        alt="Preview"
                        className="mt-2 w-full rounded-md max-h-100 object-contain"
                    />
                </div>
            ) 
            :
            /* Else show drag & drop  */
            (
                <Label 
                    htmlFor = 'image'
                    className={`flex flex-col items-center justify-center h-32 mt-4 cursor-pointer
                    text-muted-foreground
                    border-2 border-dashed rounded-lg
                    ${isDraggingOver ? 'bg-accent' : 'bg-background'}`}
                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
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
            )
        }
      </div>
    </div>
  );
};
export default ProductImageUpload