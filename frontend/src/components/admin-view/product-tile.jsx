import { Pencil, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"

const AdminProductTile = ({product, setId, setFormData, setOpenDialog}) => {
    const handleEdit = () => {
        setOpenDialog(true);
        setId(product?._id);
        setFormData(product);
    }
  return (
    <Card className="w-full max-w-sm mx-auto pt-0">
      <div>
        {/* ===== Image ===== */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] mb-2 block object-cover"
        />

        <CardContent>
          {/* ===== Title ===== */}
          <h2 className="text-xl font-bold mb-2 truncate">{product.title}</h2>

          {/* ===== Price ===== */}
          <div className="flex flex-col mb-2">
            <span
              className={`mb-1 text-md 
                        ${
                          product.salePrice > 0
                            ? "line-through text-muted-foreground"
                            : "font-bold text-primary"
                        }`}
            >
              {"$" + product.price}
            </span>
            <span
              className={`text-md font-bold 
                    ${product.salePrice === 0 && "invisible"}`}
            >
              {product.salePrice > 0 ? "$" + product.salePrice : "\u00A0"}
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

          {/* ===== Edit & Delete ===== */}
          <div className="flex flex-row justify-end gap-2">
            <Pencil
              size={20}
              strokeWidth={1.75}
              title="Edit"
              className="text-muted-foreground hover:text-accent-foreground cursor-pointer"
              onClick= {handleEdit}
            />
            <Trash2
              size={20}
              strokeWidth={1.75}
              title="Delete"
              className="text-muted-foreground hover:text-destructive cursor-pointer"
            />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
export default AdminProductTile