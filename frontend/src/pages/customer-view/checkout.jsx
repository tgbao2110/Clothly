import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/customer-view/cart/cart-item";
import AddressCard from "@/components/customer-view/account/adressCard";
import { Separator } from "@/components/ui/separator";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const addresses = useSelector((state) => state.address.addresses);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0] || null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectAddress = (e, address) => {
    e.preventDefault();
    setSelectedAddress(address);
    setIsDialogOpen(false);
  };

  const handleGoToAccount = (e) => {
    e.preventDefault();
    navigate("/account", { state: { defaultTab: "addresses" } });
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.salePrice * item.qty,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-10">
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Separator/>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* === Cart Summary === */}
        <div className="space-y-3">
          <div className="space-y-4">
            {cartItems.map((item, i) => (
              <CartItem key={i} item={item} readOnly />
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg md:border-t pt-4">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* === Address Section === */}
        <div className="border rounded-md p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Shipping Address</h2>

            {addresses.length > 0 && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-lg font-semibold mb-3">
                    Choose an address
                  </DialogTitle>
                  <DialogDescription className="space-x-1">
                    <span>Not what you are looking for?</span>
                    <a
                      href="#"
                      onClick={(e) => handleGoToAccount(e)}
                      className="inline-flex items-center text-sm font-medium text-primary 
                          hover:underline underline-offset-2"
                    >
                      {"Add a new adress here >"}
                    </a>
                  </DialogDescription>
                  <div className="space-y-3">
                    {addresses.map((address, i) => (
                      <div
                        key={i}
                        onClick={(e) => handleSelectAddress(e, address)}
                        className="cursor-pointer"
                      >
                        <AddressCard address={address} />
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {selectedAddress ? (
            <div className="font-semibold space-y-1 mt-6">
              <div className="font-bold truncate">
                {`${selectedAddress.address}, ${selectedAddress.city}`}
              </div>
              <div className="flex flex-row gap-1 truncate">
                <span className="text-muted-foreground font-normal">
                  ZIP code:
                </span>
                {selectedAddress.zipCode}
              </div>
              <div className="flex flex-row gap-1 truncate">
                <span className="text-muted-foreground font-normal">
                  Phone number:
                </span>
                {selectedAddress.phone}
              </div>
            </div>
          ) : (
            <div className="space-x-1">
              <span className="text-sm text-destructive">
                No address found.
              </span>
              <a
                href="#"
                onClick={(e) => handleGoToAccount(e)}
                className="inline-flex items-center text-sm font-medium text-primary 
                  hover:underline underline-offset-2"
              >
                {"Add one now >"}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* === Confirm Button === */}
      <Button
        disabled={!selectedAddress || cartItems.length === 0}
        className="w-full mt-5"
      >
        Place Order
      </Button>
    </div>
  );
};

export default Checkout;