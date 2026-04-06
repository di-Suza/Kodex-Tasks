import { useState, useMemo } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import useProducts from "../../hooks/useProducts";
import { useSearchParams } from "react-router";

const Products = () => {
  const { products } = useProducts();

  const [searchParams] = useSearchParams();
  const topRated = searchParams.get("sort");
  const categorySort = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    categorySort ? categorySort : "All Categories",
  );
  const [sortBy, setSortBy] = useState(topRated ? "Top Rated" : "Featured");

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        category === "All Categories" || p.category === category.toLowerCase();
      return matchSearch && matchCat;
    });

    if (sortBy === "Price: Low → High")
      result.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High → Low")
      result.sort((a, b) => b.price - a.price);
    if (sortBy === "Top Rated")
      result.sort((a, b) => b.rating.rate - a.rating.rate);

    return result;
  }, [search, category, sortBy, products]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setSortBy("Featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 bg-[#0D0D0D]">
      <div className="space-y-7 py-2">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-white p-2 mb-2 tracking-tight">
            All Products
          </h1>
          <p className="text-gray-500 font-medium">
            {filteredProducts.length} products found
            {category !== "All Categories" && (
              <span className="text-[#d4ff00]"> in {category}</span>
            )}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#0f0f0f] border border-gray-300 rounded-2xl p-3 ">
          <div className=" flex flex-col md:flex-row sm:w-full gap-3">
            {/* Search */}
            <div className="relative flex-1 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#d4ff00] transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-2xl py-2 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4ff00]/50 transition"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative min-w-[200px]">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none capitalize bg-black border border-gray-800 rounded-2xl py-2 px-5 text-white focus:outline-none focus:border-[#d4ff00] cursor-pointer"
              >
                {[
                  "All Categories",
                  "electronics",
                  "clothing",
                  "furniture",
                  "home",
                  "sports",
                  "accessories",
                ].map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={18}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[200px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-black border border-gray-800 rounded-2xl py-2 px-5 text-white focus:outline-none focus:border-[#d4ff00] cursor-pointer"
              >
                {[
                  "Featured",
                  "Price: Low → High",
                  "Price: High → Low",
                  "Top Rated",
                  "Lowest Rated",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={18}
              />
            </div>

            {/* Clear Button (Visible only if filter active) */}
            {(search ||
              category !== "All Categories" ||
              sortBy !== "Featured") && (
              <button
                onClick={clearFilters}
                className="flex items-center cursor-pointer justify-start py- gap-2 px-6 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-400/10 hover:text-red-400 transition group"
              >
                <X size={18} />
                <span className="font-bold">Clear</span>
              </button>
            )}
          </div>
          {(category !== "All Categories" ||
            sortBy !== "Featured" ||
            search) && <div className="border-b border-b-white my-3 "></div>}
          <div className="flex gap-2 py-1">
            {/* Active Filter Tags */}
            {category !== "All Categories" && (
              <div className="flex gap-2">
                <span className="bg-[#d4ff00]/10  cursor-pointer  text-[#d4ff00] border border-[#d4ff00]/20 px-4 py-0.5 rounded-xl text-sm font-bold flex items-center gap-2">
                  {category}{" "}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => setCategory("All Categories")}
                  />
                </span>
              </div>
            )}
            {sortBy !== "Featured" && (
              <div className="flex gap-2">
                <span className="bg-[#d4ff00]/10  cursor-pointer  text-[#d4ff00] border border-[#d4ff00]/20 px-4 py-0.5 rounded-xl text-sm font-bold flex items-center gap-2">
                  {sortBy}{" "}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => setSortBy("Featured")}
                  />
                </span>
              </div>
            )}
            {search !== "" && (
              <div className="flex gap-2">
                <span className="bg-[#d4ff00]/10  cursor-pointer  text-[#d4ff00] border border-[#d4ff00]/20 px-4 py-0.5 rounded-xl text-sm font-bold flex items-center gap-2">
                  {search}{" "}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => setSearch("")}
                  />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-[#0f0f0f] border border-gray-800 rounded-[3rem]">
            <div class="text-center">
              <div class="mb-6 flex justify-center">
                <div class="relative h-20 w-20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    class="h-full w-full text-zinc-600"
                  >
                    <path d="M21 8L12 3L3 8V16L12 21L21 16V8Z" />
                    <path d="M3 8L12 13L21 8" />
                    <path d="M12 13V21" />
                  </svg>
                  <div class="absolute -bottom-1 -right-1 rounded-full bg-[#0a0a0a] p-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      class="h-6 w-6 text-zinc-400"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                </div>
              </div>

              <h1 class="mb-2 text-2xl font-semibold tracking-tight text-zinc-200">
                No products found
              </h1>
              <p class="mb-8 text-zinc-500">
                No results for "<span class="italic">{search}</span>"
              </p>

              <button
                onClick={() => clearFilters()}
                class="cursor-pointer rounded-2xl border border-zinc-700 bg-transparent px-8 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 active:scale-95"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
