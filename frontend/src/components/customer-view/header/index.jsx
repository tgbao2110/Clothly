import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { Menu, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import CustomerHeaderMenuItems from "./header-menu-items"
import CustomerHeaderActions from "./header-actions"
import CustomerHeaderAuthActions from "./header-auth-actions"

const CustomerHeader = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [isMenuSheetOpen, setIsMenuSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b">
      <div className="flex justify-between items-center h-16 px-4 md:px-6">
        {/* ==== Logo ==== */}
        <Link to={"/"} className="hidden lg:flex flex-row gap-2 items-center">
          <ShoppingBag />
          <span className="text-lg font-bold">Clothly</span>
        </Link>

        {/* ==== sm: Nav Menu Sheet ==== */}
        <Sheet open={isMenuSheetOpen} onOpenChange={setIsMenuSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetHeader className='border-b'>
              <SheetTitle className="flex flex-row gap-2 items-center">
                <ShoppingBag />
                <span className="text-lg font-bold">Clothly</span>
              </SheetTitle>
            </SheetHeader>
              <CustomerHeaderMenuItems/>
          </SheetContent>
        </Sheet>

        {/* ==== lg: Nav Menu ==== */}
        <div className="hidden lg:flex flex-row">
          <CustomerHeaderMenuItems/>
        </div>

        {/* ==== Logout ==== */}
        {isAuthenticated ? <CustomerHeaderActions/> : <CustomerHeaderAuthActions/>}

        
      </div>
    </header>
  );
}
export default CustomerHeader