import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { sortOptions } from "@/config"
import ProductFilter from "@/components/customer-view/filter"
import CustomerProductTile from "@/components/customer-view/product-tile"
import { getFilteredProducts } from "@/store/customer-slices/products-slice"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownUp } from "lucide-react"

const Listing = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.customerProducts.products)
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  useEffect(() => {
    dispatch(getFilteredProducts())
    .then(action => {
      console.log(action?.payload?.message);
    })
  }, [])

  const handleFilter = (section, selected) => {
    const currentSection = filters[section] || [];
    let updatedSection;
    //
    // If checked => uncheck
    if(currentSection.includes(selected))
      updatedSection = currentSection.filter(i => i !== selected);
    // If unchecked => check
    else
      updatedSection = [...currentSection, selected];
    //
    // if section not exist, add updatedSection to state
    // if section already exists, overwrite it with updatedSection
    const updatedFilters = {
      ...filters,
      [section]: updatedSection
    };

    setFilters(updatedFilters);
    console.log(updatedFilters);
  }

  const handleSort = value => {
    setSort(value);
    console.log(value)
  }

  return (
    <div className="w-full p-4 md:p-6 grid grid-cols-[auto_1fr] gap-3">
      {/* ====== Left Grid (filter) ====== */}
      <ProductFilter filters={filters} handleFilter={handleFilter}/>

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
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((option) => (
                      <DropdownMenuRadioItem value={option.id} key={option.id}
                      className={`pl-2 [&>span]:hidden
                        ${option.id === sort && 'bg-accent font-semibold'}`}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator className="mb-8" />

        {/* ==== Products ==== */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(product => (
            <CustomerProductTile key={product._id} product={product}/>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Listing