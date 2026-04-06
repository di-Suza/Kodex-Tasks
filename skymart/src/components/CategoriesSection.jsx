import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const CategoriesSection = () => {
  const navigate = useNavigate();
  

  const categories = [
    { icon: "💻", name: "Electronics", items: 17 },
    { icon: "📦", name: "Clothing", items: 2 },
    { icon: "📦", name: "Furniture", items: 3 },
    { icon: "📦", name: "Home", items: 14 },
    { icon: "📦", name: "Sports", items: 8 },
    { icon: "📦", name: "Accessories", items: 6 },
  ];

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-white text-xl font-bold tracking-tight">
          Shop by Category
        </h2>
        <button onClick={() => navigate("/products")}  className="flex cursor-pointer items-center gap-1 text-[#d4ff00] text-sm font-medium hover:underline">
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => navigate(`/products?category=${cat.name.toLowerCase()}`)}
            className="bg-white cursor-pointer rounded-3xl py-6 px-4 flex flex-col items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
          >
            <span className="text-3xl">{cat.icon}</span>
            <div className="text-center">
              <h3 className="text-black font-bold text-sm">{cat.name}</h3>
              <p className="text-gray-500 text-xs">{cat.items} items</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
