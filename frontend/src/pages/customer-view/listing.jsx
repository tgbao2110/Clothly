import ProductFilter from "@/components/customer-view/filter"

const Listing = () => {
  return (
    <div className="w-full p-4 md:p-6">
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <ProductFilter/>
    </div>
    </div>
  )
}
export default Listing