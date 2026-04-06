import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Box,
} from "lucide-react";
import useCart from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { Link } from "react-router";

const SidebarCart = () => {
  const {
    isOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useCart();
  const { showToast } = useToast();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-gray-800 z-[70] transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg">
                <ShoppingBag size={20} className="text-[#d4ff00]" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Cart{" "}
                <span className="bg-[#d4ff00]/20 text-[#d4ff00] text-xs px-2 py-0.5 rounded-full ml-2">
                  {cartItems.length} items
                </span>
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-800 cursor-pointer  rounded-full text-gray-400 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Dynamic Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="bg-[#1a1a1a]  rounded-3xl border border-neutral-800 mb-4 aspect-square flex items-center justify-center w-20 h-20 shadow-inner">
                  <Box
                    className="text-neutral-600"
                    size={40}
                    strokeWidth={1.5}
                  />
                </div>

                <h2 className="text-gray-400 text-lg font-bold tracking-tight mb-2">
                  Cart is empty
                </h2>

                <p className="text-neutral-600 text-sm font-medium mb-6 max-w-[280px]">
                  Go shop something cool!
                </p>

                <Link
                  to="/products"
                  onClick={closeCart}
                  className="bg-[#d0ff00e2]  cursor-pointer  text-black text-sm font-medium px-6 py-3 rounded-2xl transition-all duration-200 hover:bg-[#d0ff00] active:scale-95 shadow-[0_4px_10px_rgba(207,255,0,0.2)]"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[#d4ff00] font-bold mb-3">
                      ${item.price}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-black border border-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 cursor-pointer  text-gray-500 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm text-white font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-gray-500 cursor-pointer  hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                        }}
                        className="text-gray-600 cursor-pointer  hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Dynamic Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-800 space-y-4 bg-black/50">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-2xl font-bold text-white">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  clearCart();
                  showToast("Order placed! 🎉 (Demo)");
                }}
                className="w-full cursor-pointer  bg-[#d4ff00] hover:bg-[#c4ef00] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition group text-lg"
              >
                Checkout{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition"
                />
              </button>
              <button
                onClick={clearCart}
                className="w-full cursor-pointer  text-gray-500 hover:text-gray-300 text-sm font-medium transition"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarCart;
