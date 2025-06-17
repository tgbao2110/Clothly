import { filterOptions } from "@/config"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"

const ProductFilter = () => {
  return (
    <div className="rounded-lg shadow-sm">
        <div className="p-4 space-y-4">
            {
                Object.keys(filterOptions).map((key,i) => (
                    <div key={key}>
                        <h3 className="font-semibold mb-3">
                            {key.charAt(0).toUpperCase()+key.slice(1)}
                        </h3>
                        <div className='grid gap-2 mb-6'>
                            {
                                filterOptions[key].map(option=>(
                                    <Label key={option.label}>
                                        <Checkbox/>
                                        {option.label}
                                    </Label>
                                ))
                            }
                        </div>
                        {i !== Object.keys(filterOptions).length - 1 && <Separator/>}
                    </div>
                ))
            }
        </div>
    </div>
  )
}
export default ProductFilter