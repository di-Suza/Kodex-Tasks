import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProducts from "../../hooks/useProducts";
import StarRating from "../../components/StarRating";
import Loading from "../../components/Loading";
import useCart from "../../hooks/useCart";
import ProductCard from "../../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const { getProduct, getAdjacentProductId, getRelatedProducts } =
    useProducts();
  const { cartItems, addToCart, updateQuantity, toggleCart, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = getProduct(id);

    setProduct(foundProduct);
    setRelatedProducts(getRelatedProducts(id, foundProduct?.category));
  }, [id, getProduct, getRelatedProducts]);

  const cartProduct = cartItems.find((item) => item.id === id);
  const currentQty = cartProduct ? cartProduct.quantity : 0;
  const isAdded = currentQty > 0;

  const [wishlisted, setWishlisted] = useState(false);

  if (!product) return <Loading />;

  return (
    <>
      <div className="bg-black min-h-screen text-white font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 animate-fade-in">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 px-6 py-2 text-sm text-[#888]">
            <span
              className="cursor-pointer hover:text-white transition"
              onClick={() => navigate("/products")}
            >
              <span className="text-base">←</span>
              &nbsp; Products
            </span>
            <span className="text-[#444]">/</span>
            <span className="cursor-pointer hover:text-white transition">
              {product.category}
            </span>
            <span className="text-[#444]">/</span>
            <span className="text-[#ccc]">{product.title}</span>
          </div>

          {/* Main Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 pt-6">
            {/* LEFT — Product Image */}
            <div className="lg:w-[460px] w-full flex-shrink-0">
              <div className="bg-white rounded-3xl p-10 flex items-center justify-center aspect-square animate-scale-in">
                <img
                  src={product.image}
                  alt="Comfortable Cotton T-Shirt"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* RIGHT — Product Details */}
            <div className="flex-1 pt-1">
              {/* Category Badge */}
              <span className="inline-block text-[#c8f040] bg-[#c8f040]/5 border border-[#c8f040]/30 text-xs font-bold px-2 py-0.5 rounded-full mb-4">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl lg:text-[32px] font-extrabold text-white leading-tight mb-4">
                {product.title}
              </h1>

              {/* Stars + Rating */}
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-[#f5a623] text-lg tracking-wide">
                  <StarRating rating={product.rating.rate} />
                </div>
                <span className="text-white font-semibold text-sm">
                  {product.rating.rate}
                </span>
                <span className="text-[#777] text-sm">
                  {product.rating.count}
                </span>
              </div>

              <hr className="border-[#2a2a2a] my-4" />

              {/* Price */}
              <p className="text-[36px] font-extrabold text-[#c8f040] mb-4">
                ${product.price}
              </p>

              <hr className="border-[#2a2a2a] mb-4" />

              {/* Description */}
              <p className="text-[#aaa] text-sm leading-7 mb-6">
                {product.description}
              </p>

              {/* In Cart Box */}
              {currentQty > 0 && (
                <div className="flex items-center justify-between border border-[#2e2e2e] rounded-2xl px-4 py-3 mb-3">
                  <span className="text-[#888] text-sm">In cart:</span>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        if (currentQty === 1) {
                          removeFromCart(product.id);
                          return;
                        }
                        updateQuantity(product.id, -1);
                      }}
                      className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#3a3a3a] text-white text-lg flex items-center justify-center hover:bg-[#2a2a2a] transition"
                    >
                      −
                    </button>
                    <span className="text-white font-bold text-lg w-5 text-center">
                      {currentQty}
                    </span>
                    <button
                      onClick={() => {
                        if (currentQty === 0) {
                          addToCart(product);
                          return;
                        }
                        updateQuantity(product.id, 1);
                      }}
                      className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-[#3a3a3a] text-white text-lg flex items-center justify-center hover:bg-[#2a2a2a] transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart + Wishlist */}
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => {
                    toggleCart();
                    if (currentQty === 0) {
                      addToCart(product);
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-sm transition ${
                    isAdded
                      ? "bg-[#1a3d1a] text-[#c8f040]"
                      : "bg-[#c8f040] text-[#111]"
                  }`}
                >
                  {isAdded ? <>✓ Added to Cart</> : <>+ Add to Cart</>}
                </button>
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className={`w-[52px] h-[52px] flex items-center justify-center rounded-2xl border transition text-xl ${
                    wishlisted
                      ? "border-red-500 text-red-500 bg-[#2a1a1a]"
                      : "border-[#333] text-white bg-[#1a1a1a] hover:border-[#555]"
                  }`}
                >
                  {wishlisted ? "♥" : "♡"}
                </button>
              </div>

              {/* View Cart */}
              <button
                onClick={() => {
                  toggleCart();
                }}
                className="w-full border border-[#333] rounded-2xl py-4 text-white text-sm font-semibold bg-[#1a1a1a] hover:bg-[#222] transition flex items-center justify-center gap-2 mb-6"
              >
                View Cart →
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  {
                    icon: "🚚",
                    title: "Free Delivery",
                    sub: "On orders $50+",
                  },
                  { icon: "🔒", title: "Secure Pay", sub: "256-bit SSL" },
                  { icon: "↩️", title: "Easy Returns", sub: "30-day policy" },
                ].map((b) => (
                  <div
                    key={b.title}
                    className="border border-[#2a2a2a] rounded-2xl py-4 px-2 flex flex-col items-center text-center"
                  >
                    <span className="text-[22px] mb-1">{b.icon}</span>
                    <p className="text-white text-xs font-bold">{b.title}</p>
                    <p className="text-[#666] text-[11px]">{b.sub}</p>
                  </div>
                ))}
              </div>

              {/* Previous / Next */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigate(
                      `/product/${getAdjacentProductId(product.id, "prev")}`,
                    );
                  }}
                  className="flex-1 bg-[#1e1e1e] border border-[#333] rounded-2xl py-4 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#2a2a2a] transition"
                >
                  ‹ Previous
                </button>
                <button
                  onClick={() => {
                    navigate(
                      `/product/${getAdjacentProductId(product.id, "next")}`,
                    );
                  }}
                  className="flex-1 bg-[#c8f040] rounded-2xl py-4 text-[#111] text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#d4f550] transition"
                >
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="font-heading font-bold text-2xl mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-10">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => <ProductCard product={item} />)
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
