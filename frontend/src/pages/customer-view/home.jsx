import HomeBanner from "@/components/customer-view/home/banner";
import HomeFeatured from "@/components/customer-view/home/featured";
import { getAllBanners } from "@/store/admin-slices/banners-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  
  const dispatch = useDispatch();
  const banners = useSelector(state => state.adminBanners.banners);

  useEffect(() => {
    dispatch(getAllBanners())
  }, [dispatch])

  return (
    <div>
      <HomeBanner slides={banners}/>
      <HomeFeatured/>
    </div>
  );
};

export default Home;