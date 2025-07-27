import { useSelector } from "react-redux";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AccountAddress from "@/components/customer-view/account/addresses";
import AccountOrders from "@/components/customer-view/account/orders";

const Account = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <div className="flex flex-col p-16 gap-8">
      {/* ==== Avt & Name ==== */}
      <div className="flex flex-row items-center gap-1.5">
        <Avatar className='size-10'>
          <AvatarFallback className="bg-black text-white font-medium">
            {user?.userName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <h2 className="text-md font-bold">
           {user?.userName}
          </h2>
          <p className="text-muted-foreground text-xs">
            {user?.email}
          </p>
        </div>
      </div>

      {/* ==== Orders & Addresses ==== */}
      <Tabs defaultValue='orders'>
        <TabsList>
          <TabsTrigger value='orders'>Orders</TabsTrigger>
          <TabsTrigger value='addresses'>Addresses</TabsTrigger>
        </TabsList>
        <TabsContent value='orders'>
          <AccountOrders/>
        </TabsContent>
        <TabsContent value='addresses'>
          <div className="flex flex-col">
            <AccountAddress/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Account