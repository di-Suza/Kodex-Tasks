import { createContext, useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import useAuth from "../hooks/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const closeCart = () => setIsOpen(false);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem(`${user?.email}_cartItems`)) || [],
  );

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(
        `${user?.email}_cartItems`,
        JSON.stringify(cartItems),
      );
    }
  }, [cartItems]);

  useEffect(() => {
    if (user?.email) {
      const savedCart = localStorage.getItem(`${user.email}_cartItems`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    }
  }, [user?.email]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
    showToast("Added to cart 🛒");
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast(" ❌  Removed from cart!");
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    showToast("Cart Cleared! ");
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const cartIds = new Set(cartItems.map((item) => item.id));

  return (
    <CartContext.Provider
      value={{
        cartIds,
        cartItems,
        cartItemsCount,
        isOpen,
        toggleCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal: Math.round(cartTotal),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
