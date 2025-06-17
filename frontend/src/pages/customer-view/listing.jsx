import ProductFilter from "@/components/customer-view/filter"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { sortOptions } from "@/config"
import { ArrowDownUp } from "lucide-react"

const Listing = () => {
  return (
    <div className="w-full p-4 md:p-6 grid grid-cols-[auto_1fr] gap-3">
      {/* ====== Left Grid (filter) ====== */}
      <ProductFilter/>

      {/* ====== Right Grid (content) ====== */}
      <div className="space-y-4">
        <div className="flex flex-row justify-end">
          {/* ==== Sort ==== */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='muted' className="hover:bg-accent">
                <ArrowDownUp />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-6'>
              {
                sortOptions.map(option => (
                  <DropdownMenuItem>
                    {option.label}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator className='mb-8'/>

        {/* ==== Products ==== */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              <div>Product</div>
              <div>Product</div>
              <div>Product</div>
              <div>Product</div>
        </div>
      </div>
      
    </div>
  )
}
export default Listing