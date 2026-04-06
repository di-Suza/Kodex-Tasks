import useCart from "../hooks/useCart";
import { useNavigate } from "react-router";
import StarRating from "./StarRating";

const ProductCard = ({ product: prod }) => {
  const { addToCart, cartIds } = useCart();

  const navigate = useNavigate();

  let isAdded = cartIds.has(prod.id);

  return (
    <div
      onClick={() => {
        navigate(`/product/${prod.id}`);
      }}
      className="w-full bg-black rounded-3xl overflow-hidden border border-gray-700 cursor-pointer"
    >
      {/* Top White Section with Image */}
      <div className="bg-white rounded-t-3xl p-2.5 pb-0">
        {/* Category Badge */}
        <div className="inline-block bg-gray-600 text-white text-xs font-medium px-2 py-0.5 rounded-full mb-2">
          {prod.category}
        </div>

        {/* Product Image Container */}
        <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-center aspect-square">
          <img
            src={prod.image}
            alt={prod.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Bottom Dark Section with Details */}
      <div className="bg-gray-700/20 px-4 py-3">
        {/* Category Label */}
        <p className="text-gray-600 text-[11px] font-medium mb-2">
          {prod.category}
        </p>

        {/* Product Name (Updated to prod.title) */}
        <h3 className="text-white text-sm font-bold leading-tight mb-3 min-h-[2rem]">
          {prod.title}
        </h3>

        {/* Rating (Updated to prod.rating.rate) */}
        <div className="flex items-center gap-0.5 mb-4">
          <StarRating rating={prod.rating?.rate || 0} />
          <span className="text-gray-600 text-xs ml-1.5">
            ({prod.rating?.count || 0})
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-white mb-2" />

        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <span className="text-[#d4ff00] text-xl font-black">
            ${prod.price}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(prod);
            }}
            disabled={isAdded}
            className={`flex cursor-pointer items-center gap-2 px-2 py-1 rounded-xl font-bold text-xs transition-all duration-200 ${
              isAdded
                ? "bg-green-600/20 text-green-500 border border-green-600/30"
                : "bg-[#d4ff00] text-black hover:bg-[#c4ef00] active:scale-95"
            }`}
          >
            {isAdded ? (
              <>
                <svg
                  className="w-3.25 h-3.25"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg
                  className="w-[13px] h-[13px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
