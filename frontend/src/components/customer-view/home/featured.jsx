import { getFilteredProducts } from "@/store/customer-slices/products-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerProductTile from "../products/product-tile";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeFeatured = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(state => state.customerProducts.products);
  
  useEffect(() => {
    dispatch(getFilteredProducts())
    .then(action=> {
      if (action.payload.success)
        console.log ("Products fetched successfully: ", action.payload)
      else
        console.log ("Error fetching products")
    })
  }, [dispatch])

  return (
    <div className=" flex flex-col gap-8
      min-w-screen p-4 sm:p-8 lg:p-12 xl:p-16"
    >
      <h1 className="text-primary font-bold text-2xl text-center"
      >
        Featured Products
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <CustomerProductTile key={product._id} product={product} />
        ))}
      </div>
      <div className="flex flex-row justify-center md:justify-end">
        <Button onClick={() => navigate('/listing')}>
          View All
          <ChevronRight/>
        </Button>
      </div>
    </div>
  );
}
export default HomeFeatured