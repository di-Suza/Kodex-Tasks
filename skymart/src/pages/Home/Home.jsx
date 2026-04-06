import CategoriesSection from "../../components/CategoriesSection";
import HeroSection from "../../components/HeroSection";
import ProductHighlightsSection from "../../components/ProductHighlightsSection";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <HeroSection />
      <CategoriesSection />
      <ProductHighlightsSection />
    </div>
  );
};

export default Home;
