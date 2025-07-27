import CommonForm from "@/components/common/form"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createAddressForm } from "@/config/create-address"
import { createAddress } from "@/store/customer-slices/address-slice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

const AccountAddress = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);

  const initState = {
    phone: '',
    city: '',
    address: '',
    zipCode: '',
    notes: ''
  }

  const [formData, setFormData] = useState(initState);

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

  return (
     <Card>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3">
            <div>Address1</div>
            <div>Address2</div>
            <div>Address3</div>
          </div>
          <Separator/>
          <div className="space-y-5">
            <h1 className="text-lg font-semibold">Add new address</h1>
            <CommonForm 
              formControls={createAddressForm}
              formData={formData}
              setFormData={setFormData}
              onSubmit={e => handleCreate(e)}
              buttonText='Add'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default AccountAddress