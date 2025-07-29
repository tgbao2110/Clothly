import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AccountAddress from "@/components/customer-view/account/addresses";
import AccountOrders from "@/components/customer-view/account/orders";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import scrollTo from "@/lib/scroll";
import UserInfo from "@/components/common/user-info";

const Account = () => {
  const user = useSelector(state => state.auth.user);
  const defaultTab = useLocation().state?.defaultTab || null;  

  useEffect(() => {
    if(defaultTab === 'addresses')
      scrollTo({top:200})
  }, []);

  return (
    <div className="flex flex-col py-12 px-4 sm:px-8 md:px-16 gap-8">
      {/* ==== Avt & Name ==== */}
      <UserInfo user={user}/>

      {/* ==== Orders & Addresses ==== */}
      <Tabs defaultValue={ defaultTab || 'orders' }>
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