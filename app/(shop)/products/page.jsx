"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
  RotateCcw,
} from "lucide-react";

import { products } from "@/data/products";
import ProductCard from "@/components/home/FeaturedProducts/ProductCard";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory.toLowerCase());
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "smartphones", name: "Smartphones" },
    { id: "laptops", name: "Laptops" },
    { id: "audio", name: "Audio" },
    { id: "wearables", name: "Wearables" },
    { id: "gaming", name: "Gaming" },
    { id: "cameras", name: "Cameras" },
    { id: "monitors", name: "Monitors" },
    { id: "tablets", name: "Tablets" },
    { id: "components", name: "Components" },
  ];

  const brands = ["all", "Apple", "Samsung", "Sony", "Dell", "DJI", "Keychron"];

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category
        if (
          selectedCategory !== "all" &&
          item.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        // Brand
        if (
          selectedBrand !== "all" &&
          item.brand.toLowerCase() !== selectedBrand.toLowerCase()
        ) {
          return false;
        }

        // Price
        if (priceRange === "under-30k" && item.price >= 30000) return false;
        if (priceRange === "30k-60k" && (item.price < 30000 || item.price > 60000)) return false;
        if (priceRange === "60k-100k" && (item.price < 60000 || item.price > 100000)) return false;
        if (priceRange === "above-100k" && item.price <= 100000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.id - b.id; // featured default
      });
  }, [selectedCategory, selectedBrand, priceRange, sortBy]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    priceRange !== "all";

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setPriceRange("all");
    setSortBy("featured");
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Sparkles size={14} />
                <span>RStore Official Tech Catalog</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Explore All Products
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Premium smartphones, MacBooks, studio audio, cameras, and gaming gear.
              </p>
            </div>

            <div className="text-sm font-semibold text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of{" "}
              {products.length} products
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <section className="mx-auto max-w-[1440px] px-6 py-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <SlidersHorizontal size={17} className="text-blue-600" />
                  <span>Filters</span>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                        selectedCategory === cat.id
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Brand
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => setSelectedBrand(brand)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition ${
                        selectedBrand === brand
                          ? "bg-[#0b1220] text-white font-bold"
                          : "border border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {brand === "all" ? "All Brands" : brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Price Range
                </h4>
                <div className="space-y-1.5">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under-30k", label: "Under ₹30,000" },
                    { id: "30k-60k", label: "₹30,000 - ₹60,000" },
                    { id: "60k-100k", label: "₹60,000 - ₹1,00,000" },
                    { id: "above-100k", label: "Above ₹1,00,000" },
                  ].map((range) => (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setPriceRange(range.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                        priceRange === range.id
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{range.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <div>
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 lg:hidden"
              >
                <SlidersHorizontal size={14} className="text-blue-600" />
                Filters
                {hasActiveFilters && (
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </button>

              {/* Active Filter Pills */}
              <div className="hidden flex-wrap items-center gap-1.5 sm:flex">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                    Category: {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-blue-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedBrand !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                    Brand: {selectedBrand}
                    <button
                      type="button"
                      onClick={() => setSelectedBrand("all")}
                      className="hover:text-blue-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {priceRange !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                    Price: {priceRange}
                    <button
                      type="button"
                      onClick={() => setPriceRange("all")}
                      className="hover:text-blue-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  🔍
                </div>
                <h3 className="mt-4 text-xl font-black text-slate-900">
                  No products matched your criteria
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Try adjusting your filters or search terms to find what you&apos;re looking for.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900">Filter Products</h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Category */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase text-slate-400">Categories</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileFiltersOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold ${
                        selectedCategory === cat.id
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-slate-100 pt-5">
                <h4 className="mb-2.5 text-xs font-bold uppercase text-slate-400">Price</h4>
                <div className="space-y-1">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under-30k", label: "Under ₹30,000" },
                    { id: "30k-60k", label: "₹30,000 - ₹60,000" },
                    { id: "60k-100k", label: "₹60,000 - ₹1,00,000" },
                    { id: "above-100k", label: "Above ₹1,00,000" },
                  ].map((range) => (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => {
                        setPriceRange(range.id);
                        setMobileFiltersOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold ${
                        priceRange === range.id
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{range.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
