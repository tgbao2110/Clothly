import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

import { createProductForm } from "@/config"; 
import CommonForm from "@/components/common/form";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { createProduct, deleteProduct, getAllProducts, updateProduct, uploadImage } from "@/store/admin-slices/products-slice";
import AdminProductTile from "@/components/admin-view/product-tile";


const AdminProducts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.adminProducts.isLoading);
  const products = useSelector(state => state.adminProducts.products);

  const initState = {
    title: '',
    description: '',
    category: 'men',
    brand: 'nike',
    price: 0,
    salePrice: 0,
    stock: 0,
    image: 'https://i.imgur.com/EJLFNOwg.jpg'
  }

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState(initState);
  const [currentId, setCurrentId] = useState(null);


  const handleCreate = async e => {
    e.preventDefault();
    
    let finalData;
    if (image) {
      let uploadRes;
      // Dispatch POST UploadImage
      // unwrap: if success → return action.payload
      try {
        uploadRes = await dispatch(uploadImage(image)).unwrap();
      } catch (error) {
        toast.error("Please select an image");
        return null;
      }
      const finalImgUrl = uploadRes?.result?.url;
      finalData = { ...formData, image: finalImgUrl };
    } else {
      finalData = formData
    }

    // Dispatch POST createProduct
    dispatch(createProduct(finalData))
    .then((action) => {
      console.log(action?.payload?.message);
      //
      // Handle success
      if(action?.payload?.success) {
        console.log("Created product: ", action?.payload?.data);
        handleSheetToggle(false);
        toast.success(action?.payload?.message);
      }
      //
      // Handle error
      else {
        toast.error(action?.payload?.message);
      }
    })
  }

  // Dispatch POST updateProdcut
  const handleUpdate = async e => {
    e.preventDefault();
    
    let finalData
    if (image) {
      const uploadRes = await dispatch(uploadImage(image)).unwrap();
      const finalImgUrl = uploadRes?.result?.url;
      finalData = {...formData, image: finalImgUrl};
    } else {
      finalData = formData;
    }

    console.log('Update product to: ', finalData);  

    dispatch(updateProduct({id: currentId, formData: finalData}))
    .then((action) => {
      console.log (action.payload.message);
      //
      // Handle success
      if (action?.payload?.success) {
        toast.success(action?.payload?.message);
        handleSheetToggle(false);
      }
      //
      // Handle error
      else {
        toast.error(action?.payload?.message);
      }
    })
  }

  // Dispatch DELETE deleteProdcut
  const handleDelete = async e => {
    e.preventDefault();

    dispatch(deleteProduct(currentId))
      .then(action => {
        console.log(action?.payload);
        if(action?.payload?.success)
        {
          setIsConfirmDialogOpen(false);
          toast.success(action?.payload?.message);
        }
        else
          toast.error(action?.payload?.message)
      })
  }


  const isFormFilled = () => {
    return Object.values(formData)
      .map(v => v !== '')
      .every(v => v);
  }
  

  // Dispatch GET getAllProducts
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  // Handle close sheet
  const handleSheetToggle = (isOpen) => {
  setIsCreateDialogOpen(isOpen);

  if (!isOpen) {
    // Reset all states
    setImage(null);
    setPreviewUrl(null);
    setFormData(initState);
    setCurrentId(null);
  }
};

  console.log(formData)
  console.log('isFilled: ', isFormFilled())

  return (
    <div className="w-full">
      {/* ==== Add Button ==== */}
      <div className="flex justify-end mb-5">
        <Button onClick={() => setIsCreateDialogOpen(true)}>+ Add product</Button>
      </div>

      {/* ==== Add Procut Dialog ==== */}
      <Sheet open={isCreateDialogOpen} onOpenChange={handleSheetToggle}>
        <SheetContent className="overflow-y-auto pb-5">
          {/* Dialog Header */}
          <SheetHeader className="border-b">
            <SheetTitle>
              {!currentId ? 'Add New Product' : 'Edit Product'}
            </SheetTitle>
          </SheetHeader>

          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full p-5">
              <Skeleton className="h-full w-full rounded-md" />
            </div>
          ) : (
            <>
              {/* Image Upload */}
              <ProductImageUpload
                image={image}
                setImage={setImage}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                productId={currentId}
              />

              {/* Dialog Form */}
              <div className="px-5">
                <CommonForm
                  formControls={createProductForm}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={!currentId ? handleCreate : handleUpdate}
                  buttonText={!currentId ? 'Add Product' : 'Update Product'}
                  isFilled={isFormFilled()}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ==== Delete Confirmation Dialog ==== */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this product permanently?</DialogTitle>
              <DialogDescription>This action cannot be undone</DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex flex-row justify-end'>
              <Button 
                variant='secondary'
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant='destructive'
                onClick = {handleDelete}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* ==== Products List ==== */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <AdminProductTile
            key={i}
            product={product}
            setId={setCurrentId}
            setFormData={setFormData}
            openEdit={setIsCreateDialogOpen}
            openConfirm={setIsConfirmDialogOpen}
          />
        ))}
      </div>
    </div>
  );
}
export default AdminProducts