import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProduct = (id) => {
    return products.find((item) => item.id === id);
  };
  const getAdjacentProductId = (currentId, direction = "next") => {
    if (!products || products.length === 0) return null;

    const currentIndex = products.findIndex((p) => p.id === currentId);

    if (currentIndex === -1) return products[0].id;

    let targetIndex;

    if (direction === "next") {
      targetIndex = (currentIndex + 1) % products.length;
    } else if (direction === "prev") {
      targetIndex = (currentIndex - 1 + products.length) % products.length;
    }

    return products[targetIndex].id;
  };

  const getRelatedProducts = (id, category = "home") => {
    if (!products || products.length === 0) return [];
    const relatedProducts = products.filter((item) => {
      return item.category === category && item.id !== id;
    });
    const shuffled = [...relatedProducts].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 5);
  };

  const getTopRatedProducts = () => {
    if (!products || products.length === 0) return [];
    const sorted = [...products].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, 5);
  };
  const getLatestArrivals = () => {
    if (!products || products.length === 0) return [];
    const latest = [...products].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return latest.slice(0, 5);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getProduct,
        getAdjacentProductId,
        getRelatedProducts,
        getTopRatedProducts,
        getLatestArrivals,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
