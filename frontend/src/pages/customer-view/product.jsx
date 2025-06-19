import { useEffect, useState } from "react";

import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "@/store/customer-slices/products-slice";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { addToCart } from "@/store/customer-slices/cart-slice";

const Product = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const [product, setProduct] = useState(null)
    const [isOutOfStock, setIsOutOfStock] = useState(true);
    const [qty, setQty] = useState(1);
    const isLoading = useSelector(state => state.customerProducts.isLoading);
    const userId = useSelector(state => state.auth.user.id)

    // Fetch product details
    useEffect(()=> {
      dispatch(getProductById(id))
      .then(action => {
        if(action.payload?.success) {
          setProduct(action.payload?.data);
          setIsOutOfStock(action.payload?.data.stock <= 0);
        } else {
          toast.error(action.payload?.message);
        }
      })
    },[])

    // Handle add to cart
    const handleAddToCart = e => {
      e.preventDefault();

      dispatch(addToCart({userId, productId: id, qty}))
      .then(action => {
        if(action.payload?.success){
          console.log('Added to cart', action.payload);
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
      })
    }

  return (
    product ? 
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* ===== Image & Info + Actions ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        {/* == Image == */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[250px] md:h-[500px] object-cover rounded-md"
        />

        {/* == Info + Actions == */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl font-bold">{product.title}</h1>

            {/* Rating */}
            <div className="flex flex-row gap-1 text-yellow-400">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>

            {/* Price */}
            <div className="flex flex-row gap-2 mb-3 text-xl">
              <span
                className={`mb-1 
                ${
                  product.salePrice !== product.price
                    ? "line-through text-muted-foreground"
                    : "font-bold text-primary"
                }`}
              >
                {"$" + product.price}
              </span>
              <span
                className={`font-bold 
                ${product.price === product.salePrice && "invisible"}`}
              >
                {product.price !== product.salePrice
                  ? "$" + product.salePrice
                  : "\u00A0"}
              </span>
            </div>

            {/* Category & brand */}
            <div className="text-sm text-muted-foreground">
              Category:{" "}
              <span className="text-primary font-semibold">
                {product.category}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Brand:{" "}
              <span className="text-primary font-semibold">
                {product.brand}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-5">
            {isOutOfStock ? (
              <div className="text-sm text-destructive">Out of stock</div>
            ) : (
              <div className="text-sm text-muted-foreground italic">
                <span>{product.stock}</span> {" products in stock"}
              </div>
            )}
            <div className="flex flex-row gap-2 w-[180px] mt-3">
              <Input
                name="quantity"
                placeholder="Quantity:"
                type="number"
                value={qty}
                min={1}
                max={isOutOfStock ? 1 : product.stock}
                step={1}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setQty(e.target.value)}
              />
              <Button disabled={isOutOfStock} onClick={handleAddToCart}>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-15" />
      {/* ===== User Review ===== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">User Reviews</h2>
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-row gap-2 items-center">
                <Avatar>
                  <AvatarFallback className="bg-black text-white font-medium">
                    U
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold">User</span>
              </div>
              <div className="flex flex-row gap-1 text-yellow-400">
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
                <Star size={15} fill="currentColor" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground px-1">Test review...</p>
          </CardContent>
        </Card>
      </div>
    </div>
    :
    <div className="flex flex-row justify-center items-center w-full min-h-[500px]">
      <h1 className="text-lg font-bold">{
        isLoading ? 'Loading...'
        : 'Product not found!'
      }</h1>
    </div>
  );
}
export default Product