import { filterOptions } from "@/config"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const ProductFilter = ({filters, handleFilter}) => {
  return (
    <div className="w-50">
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
                                        <Checkbox 
                                            checked = {
                                                !!(filters &&
                                                filters[key] &&
                                                filters[key].includes(option.id))
                                            }
                                            onCheckedChange={() => handleFilter(key, option.id)}
                                        />
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