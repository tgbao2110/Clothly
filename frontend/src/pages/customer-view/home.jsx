import HomeBanner from "@/components/customer-view/home/banner";
import HomeFeatured from "@/components/customer-view/home/featured";

const slides = [
  "https://res.cloudinary.com/dxpkpxyme/image/upload/v1753523602/7933269_js7n1k.jpg",
  "https://res.cloudinary.com/dxpkpxyme/image/upload/v1753524355/7933269_wkrlvk.jpg"
];

const Home = () => {
  return (
    <div>
      <HomeBanner slides={slides}/>
      <HomeFeatured/>
    </div>
  );
};

export default Home;