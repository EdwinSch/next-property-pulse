import Hero from "@/components/Hero";
import InfoBoxesLayout from "@/components/InfoBoxesLayout";
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxesLayout />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};
export default HomePage;
