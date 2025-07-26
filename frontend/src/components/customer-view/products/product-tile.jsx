import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../../ui/card"

const CustomerProductTile = ({product}) => {

  const navigate= useNavigate()
  return (
    <Card className="w-full max-w-sm mx-auto pt-0 cursor-pointer"
          onClick = {() => navigate(`/product/${product._id}`)}
    >
      <div>
        {/* ===== Image ===== */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] mb-2 block object-cover"
        />

        <CardContent>
          {/* ===== Title ===== */}
          <h2 className="text-xl font-bold mb-3 truncate">{product.title}</h2>

          {/* ===== Price ===== */}
          <div className="flex flex-row gap-2 mb-3">
            <span
              className={`mb-1 text-md 
                        ${
                          product.salePrice !== product.price
                            ? "line-through text-muted-foreground"
                            : "font-bold text-primary"
                        }`}
            >
              {"$" + product.price}
            </span>
            <span
              className={`text-md font-bold 
                    ${product.price === product.salePrice && "invisible"}`}
            >
              {product.price !== product.salePrice ? "$" + product.salePrice : "\u00A0" }
            </span>
          </div>
        </CardContent>

        <CardFooter className=" flex flex-row justify-between items-center">
          {/* ===== Stock ===== */}
          {product.stock > 0 ? (
            <div className="text-sm text-muted-foreground">
              In stock: {product.stock}
            </div>
          ) : (
            <div className="text-sm text-destructive">Out of stock</div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
export default CustomerProductTile