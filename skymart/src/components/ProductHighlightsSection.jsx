import { ArrowRight, ShoppingBag, Zap, ShieldCheck, Tag } from "lucide-react";
import { useNavigate } from "react-router";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";

const ProductHighlightsSection = () => {
  const navigate = useNavigate();
  const { getTopRatedProducts, getLatestArrivals } = useProducts();
  const { addToCart } = useCart();
  const topRated = getTopRatedProducts();
  const newArrivals = getLatestArrivals();

  const features = [
    {
      icon: <Zap size={20} className="text-[#d4ff00]" />,
      title: "Fast Delivery",
      desc: "Same-day on select items",
    },
    {
      icon: <ShieldCheck size={20} className="text-blue-400" />,
      title: "Secure Payments",
      desc: "100% encrypted checkout",
    },
    {
      icon: <Tag size={20} className="text-green-400" />,
      title: "Best Prices",
      desc: "Price-match guarantee",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-8">
      {/* Top Rated & New Arrivals Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Top Rated */}
        <div className="bg-white rounded-[32px] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-black font-bold text-lg flex items-center gap-2">
              <span className="text-yellow-400">⭐</span> Top Rated
            </h3>
            <button
              onClick={() => navigate(`/products?sort=topRated`)}
              className="text-[#a3c700] cursor-pointer text-xs font-medium flex items-center gap-1 hover:underline"
            >
              See all <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {topRated.map((item) => (
              <div
                key={`tr-${item.id}`}
                onClick={() => navigate(`/product/${item.id}`)}
                className="flex cursor-pointer items-center justify-between border border-gray-100 rounded-2xl p-2 pr-4 hover:border-gray-200 transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className={`w-12 h-12 rounded-xl bg-cover`}
                  ></div>
                  <span className="text-[#a3c700] font-bold text-sm">
                    {item.price}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-[#a3c700] hover:bg-[#f9ffdb]"
                >
                  <ShoppingBag size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div className="bg-white rounded-[32px] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-black font-bold text-lg flex items-center gap-2">
              <span className="text-[#d4ff00]">⚡</span> New Arrivals
            </h3>
            <button
              onClick={() => navigate("/products")}
              className="text-[#a3c700] cursor-pointer text-xs font-medium flex items-center gap-1 hover:underline"
            >
              See all <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {newArrivals?.length > 0 &&
              newArrivals.map((item) => (
                <div
                  key={`na-${item.id}`}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className=" cursor-pointer flex items-center justify-between border border-gray-100 rounded-2xl p-2 pr-4 hover:border-gray-200 transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      style={{ backgroundImage: `url(${item.image})` }}
                      className={`w-12 h-12 rounded-xl bg-cover`}
                    ></div>
                    <span className="text-[#a3c700] font-bold text-sm">
                      {item.price}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-[#a3c700] hover:bg-[#f9ffdb]"
                  >
                    <ShoppingBag size={14} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Feature Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-5 flex items-center gap-4"
          >
            {feat.icon}
            <div>
              <h4 className="text-white font-bold text-sm">{feat.title}</h4>
              <p className="text-gray-500 text-xs mt-0.5">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductHighlightsSection;
