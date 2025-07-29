const OrderItem = ({ item }) => {
  const { qty, product } = item;
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <div className="flex flex-row items-center justify-between gap-4">
        {/* === Left section === */}
        <div className="flex flex-row items-center gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-20 h-20 rounded object-cover"
          />
          <div className="flex flex-col max-w-[160px]">
            <h3 className="truncate whitespace-nowrap overflow-hidden">
              {product.title}
            </h3>
            <h3 className="text-sm font-bold">
              ${product.salePrice}
            </h3>
          </div>
        </div>

        {/* === Right section === */}
        <div className="text-sm text-muted-foreground 
          text-end lg:min-w-[120px] "
        >
          {`Qty: ${qty}`}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;