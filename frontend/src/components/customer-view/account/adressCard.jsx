import { Card, CardAction, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2 } from "lucide-react";

const AddressCard = ({address, handleUpdate, handleDelete}) => {
  const{address: detailedAddress, city, zipCode, phone, _id} = address;
  return (
    <Card>
      <CardContent className="font-semibold
        space-y-1 "
      >
        <div className="font-bold truncate">
          {`${detailedAddress}, ${city}`}
        </div>
        <div className="flex flex-row gap-1 truncate">
          <span className="text-muted-foreground font-normal">
            ZIP code:
          </span>       
          {zipCode}
        </div>
        <div className="flex flex-row gap-1 truncate">
          <span className="text-muted-foreground font-normal">
            Phone number:
          </span>
          {phone}
        </div>
      </CardContent>

      <div className="px-6">
        <Separator/>
      </div>
      
      <CardFooter className="flex flex-row gap-1 mt-[-5px] text-muted-foreground">
        <Pencil className="size-5 cursor-pointer hover:text-primary"
          onClick={e => handleUpdate(e, _id)}
        />
        <Trash2 className="size-5 cursor-pointer hover:text-destructive"
          onClick={e => handleDelete(e, _id)}
        />
      </CardFooter>
    </Card>
  )
}
export default AddressCard