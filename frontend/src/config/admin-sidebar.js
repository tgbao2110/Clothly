import { GalleryVertical, Shirt, ShoppingCart, SquareKanban } from "lucide-react";
export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    Icon: SquareKanban
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    Icon: Shirt
  },
  {
    id: "banners",
    label: "Banners",
    path: "/admin/banners",
    Icon: GalleryVertical
  },
 {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    Icon: ShoppingCart
  },
];