import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { createProductForm } from "@/config";
import CommonForm from "@/components/common/form";
import ProductImageUpload from "@/components/admin-view/image-upload";

const AdminProducts = () => {
  const initState = {
    title: '',
    description: '',
    category: 'men',
    brand: 'nike',
    price: 0,
    salePrice: 0,
    stock: 0,
    image: null
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState(initState);


  const handleCreate = () =>{

  }

  return (
    <div className="w-full">
      {/* ==== Add Button ==== */}
      <div className="flex justify-end mb-5">
        <Button
          onClick={() => setOpenDialog(true)}
        >
          + Add product
        </Button>
      </div>

      {/* ==== Add Procut Dialog ==== */}
      <Sheet open={openDialog} onOpenChange={setOpenDialog}>
        <SheetContent className='overflow-y-auto mb-5'>
          {/* Dialog Header */}
          <SheetHeader className='border-b'>
            <SheetTitle>
              Add New Product
            </SheetTitle>
          </SheetHeader>

          {/* Image Upload */}
          <ProductImageUpload
            image = {image}
            setImage = {setImage}
            imageUrl = {imageUrl}
            setImageUrl = {setImageUrl}
          />

          {/* Dialog Form */}
          <div className="px-5">
            <CommonForm
              formControls={createProductForm}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleCreate}
              buttonText="Add Product"
            />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* ==== Products List ==== */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </div>
    </div>
  )
}
export default AdminProducts