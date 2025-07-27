import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

import CommonForm from "@/components/common/form"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { createAddressForm } from "@/config/create-address"
import { createAddress, updateAddress } from "@/store/customer-slices/address-slice"
import AddressCard from "./adressCard"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

const AccountAddress = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);
  const addresses = useSelector(state => state.address.addresses);
  const [isUpdateMode, setIsUpdateMode] = useState(false); 
  const [currentId, setCurrentId] = useState(null);

  const initState = {
    phone: '',
    city: '',
    address: '',
    zipCode: '',
    notes: ''
  }

  const [formData, setFormData] = useState(initState);

  // Create
  const handleCreate = (e) => {
    e.preventDefault();
    const finalData = {...formData, userId: userId}
    dispatch(createAddress(finalData))
    .then(action => {
      console.log(action.payload.message)
      if(action?.payload?.success)
      {
        toast.success(action.payload?.message);
        setFormData(initState);
      }
      else
        toast.error(action.payload?.message);
    })
  }

  // Update
  const handleUpdateMode = (e, id) => {
    e.preventDefault();
    const currentData = addresses.find(a => a._id === id)
    console.log('currentId: ', id)
    setFormData(currentData);
    setCurrentId(id);
    setIsUpdateMode(true);
    window.scrollTo({
      top:300,
      behavior: "smooth",
    });
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateAddress({userId, addressId: currentId, formData}))
    .then(action => {
      if(action?.payload?.success)
      {
        toast.success(action.payload?.message);
        setIsUpdateMode(false);
        setFormData(initState);
      }
      else
        toast.error(action.payload?.message);
    })
  }

  // Cancel Update
  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setIsUpdateMode(false);
    setFormData(initState);
  }

  // Delete
  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log(`deleting address ${id}`)
  }

  return (
     <Card>
      <CardContent>
        <div className="flex flex-col gap-5">
          {addresses.length === 0 ? 
            <div className="flex flex-col gap-3 items-center">
              <p>You haven't added any address</p>
              <Button onClick={e => {
                  e.preventDefault();
                  window.scrollTo({
                    top:200,
                    behavior: "smooth",
                  });
                }}>Add one now <ArrowDown/>
              </Button>
            </div>:
            <div className="grid lg:grid-cols-2 gap-5">
              {
                addresses.map((address, i) => (
                  <AddressCard 
                    key={i} 
                    address={address}
                    handleUpdate={handleUpdateMode}
                    handleDelete={handleDelete}
                  />
                ))
              }
            </div>
          }
          <Separator/>
          <div className="space-y-5">
            <h1 className="text-lg font-semibold">
              {
                isUpdateMode ?
                "Edit address" :
                "Add new address"
              }
            </h1>
            <CommonForm 
              formControls={createAddressForm}
              formData={formData}
              setFormData={setFormData}
              buttonText={isUpdateMode ? 'Update': 'Add'}
              hasCancel={isUpdateMode}
              onCancel={e => handleCancelUpdate(e)}
              onSubmit={e => {
                isUpdateMode ?
                handleUpdate(e) :
                handleCreate(e);
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default AccountAddress