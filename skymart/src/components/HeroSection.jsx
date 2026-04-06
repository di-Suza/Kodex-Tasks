import { ArrowRight, Package, TrendingUp, Star, Tag } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import useCart from "../hooks/useCart";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { cartItems, cartTotal } = useCart();

  const stats = [
    {
      icon: <Package size={20} className="text-[#d4ff00]" />,
      title: cartItems?.length || 0,
      subtitle: "Cart Items",
      desc: "In your bag",
    },
    {
      icon: <TrendingUp size={20} className="text-blue-500" />,
      title: cartTotal || 0,
      subtitle: "Cart Value",
      desc: "Ready to checkout",
    },
    {
      icon: <Star size={20} className="text-yellow-500" />,
      title: "5",
      subtitle: "Top Products",
      desc: "Highly rated",
    },
    {
      icon: <Tag size={20} className="text-purple-500" />,
      title: "6",
      subtitle: "Categories",
      desc: "To explore",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-gray-800 p-8 md:p-10 flex flex-col md:flex-row justify-between gap-8">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="relative z-10 max-w-xl">
          <p className="text-[#d4ff00] text-xs font-bold tracking-wider uppercase mb-2">
            Good Morning 👋
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Welcome back,
            <br />
            <span className="text-[#d4ff00]">{user?.name || "User"}!</span>
          </h1>
          <p className="text-gray-400 text-sm mb-8 max-w-md">
            Discover today's picks — hand-curated products across electronics,
            fashion, and more.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center cursor-pointer gap-2 bg-[#d4ff00] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#bce600] transition"
            >
              Shop Now <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 cursor-pointer rounded-xl font-medium text-gray-300 border border-gray-700 hover:bg-gray-800 transition"
            >
              View All Products
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-4 min-w-[180px]">
          <div className="bg-[#1a1c0d] border border-[#2a2d14] p-4 rounded-2xl flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-[#d4ff00] text-3xl font-bold">20+</h3>
            <p className="text-gray-400 text-xs mt-1">Products Available</p>
          </div>
          <div className="bg-transparent border border-gray-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-white text-xl font-bold">Free</h3>
            <p className="text-gray-500 text-xs mt-1">Delivery on ₹999+</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">
                {stat.title}
              </h4>
              <p className="text-gray-400 text-xs font-medium">
                {stat.subtitle}
              </p>
              <p className="text-gray-600 text-[10px]">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
