import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { sortOptions } from "@/config"
import ProductFilter from "@/components/customer-view/filter"
import CustomerProductTile from "@/components/customer-view/product-tile"
import { getFilteredProducts } from "@/store/customer-slices/products-slice"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownUp } from "lucide-react"

const Listing = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.customerProducts.products)
  console.log(products);

  useEffect(() => {
    dispatch(getFilteredProducts())
    .then(action => {
      console.log(action?.payload?.message);
    })
  }, [])

  return (
    <div className="w-full p-4 md:p-6 grid grid-cols-[auto_1fr] gap-3">
      {/* ====== Left Grid (filter) ====== */}
      <ProductFilter />

      {/* ====== Right Grid (content) ====== */}
      <div className="space-y-4">
        <div className="flex flex-row justify-end">
          {/* ==== Sort ==== */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="muted" className="hover:bg-accent">
                <ArrowDownUp />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6">
              {sortOptions.map((option) => (
                <DropdownMenuItem>{option.label}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator className="mb-8" />

        {/* ==== Products ==== */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(product => (
            <CustomerProductTile product={product}/>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Listing