import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { createBannerForm } from "@/config/create-banner";
import { createBanner, deleteBanner, getAllBanners } from "@/store/admin-slices/banners-slice";
import { uploadImage } from "@/store/admin-slices/products-slice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminBanners = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.adminBanners.isLoading);
  const banners = useSelector(state => state.adminBanners.banners);

  const initState = {
    title: '',
    image: 'https://i.imgur.com/EJLFNOwg.jpg',
  }

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState(initState);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch])

  // Handle create
  const handleCreate = async e => {
    e.preventDefault();
    //
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
    //
    // Dispatch POST createProduct
    dispatch(createBanner(finalData))
    .then((action) => {
      console.log(action?.payload?.message);
      //
      // Handle success
      if(action?.payload?.success) {
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

  // Handle delete
  const handleConfirmDelete = (e, id) => {
    e.preventDefault();
    setCurrentId(id);
    setIsConfirmDialogOpen(true);
  }

  const handleDelete = async e => {
    e.preventDefault();

    dispatch(deleteBanner(currentId))
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

  // Handle close sheet
  const handleSheetToggle = (isOpen) => {
    setIsCreateDialogOpen(isOpen);

    if (!isOpen) {
      // Reset all states
      setImage(null);
      setPreviewUrl(null);
      setFormData(initState);
    }
  };

  return (
    <div className="w-full">
      {/* ==== Add Button ==== */}
      <div className="flex justify-end mb-5">
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          + Add banner
        </Button>
      </div>

      {/* ==== Add Procut Dialog ==== */}
      <Sheet open={isCreateDialogOpen} onOpenChange={handleSheetToggle}>
        <SheetContent className="overflow-y-auto pb-5">
          {/* Dialog Header */}
          <SheetHeader className="border-b">
            <SheetTitle>Add New Banner</SheetTitle>
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
              />

              {/* Dialog Form */}
              <div className="px-5">
                <CommonForm
                  formControls={createBannerForm}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleCreate}
                  buttonText="Add Banner"
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
              <DialogTitle>Delete this banner permanently?</DialogTitle>
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

      <div className="flex flex-col gap-8 px-16 py-8">
        {banners.map((banner, i) => (
          <Card key={i} className="w-full pt-0">
            <img
              alt={banner.title}
              src={banner.image}
              className="rounded-lg"
            />

            <CardContent className="flex flex-row justify-between">
              {/* ===== Title ===== */}
              <h2 className="text-lg font-bold max-w-1/2 truncate">
                {banner.title}
              </h2>

              <Trash2
                size={22}
                strokeWidth={1.75}
                title="Delete"
                className="text-muted-foreground hover:text-destructive cursor-pointer"
                onClick={e => handleConfirmDelete(e, banner._id)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default AdminBanners