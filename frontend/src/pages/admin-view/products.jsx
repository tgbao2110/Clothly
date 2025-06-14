import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { toast } from "sonner";

import { createProductForm } from "@/config"; 
import CommonForm from "@/components/common/form";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { createProduct, uploadImage } from "@/store/admin-slices/products-slice";
import { Skeleton } from "@/components/ui/skeleton";


const AdminProducts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.adminProducts.isLoading);

  const initState = {
    title: '',
    description: '',
    category: 'men',
    brand: 'nike',
    price: 0,
    salePrice: 0,
    stock: 0,
    image: ''
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState(initState);

  const handleCreate = async e => {
    e.preventDefault();

    // Dispatch POST UploadImage
    // unwrap: if success → return action.payload
    const uploadRes = await dispatch(uploadImage(image)).unwrap();
    
    setImageUrl(uploadRes?.result?.url);
    const finalData = {...formData, image: imageUrl};

    // Dispatch POST CreateProduct
    dispatch(createProduct(finalData))
    .then((action) => {
      console.log(action?.payload?.message);
      //
      // Handle success
      if(action?.payload?.success) {
        console.log("Created product: ", action?.payload?.data);
        setOpenDialog(false);
        toast.success(action?.payload?.message);
      }
      //
      // Handle error
      else {
        toast.error(action?.payload?.message);
      }
    })
  }

  return (
    <div className="w-full">
      {/* ==== Add Button ==== */}
      <div className="flex justify-end">
        <Button
          onClick={() => setOpenDialog(true)}
        >
          + Add product
        </Button>
      </div>

      {/* ==== Add Procut Dialog ==== */}
      <Sheet open={openDialog} onOpenChange={setOpenDialog}>
        <SheetContent className='overflow-y-auto pb-5'>
          {/* Dialog Header */}
          <SheetHeader className='border-b'>
            <SheetTitle>
              Add New Product
            </SheetTitle>
          </SheetHeader>

          {
            isLoading ?
            <div className="flex justify-center items-center w-full h-full p-5">
              <Skeleton className="h-full w-full rounded-md" />
            </div>
            :
            <>
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
            </>
          }
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