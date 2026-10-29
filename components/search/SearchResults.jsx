"use client";

import Link from "next/link";
import ProductCard from "@/components/home/FeaturedProducts/ProductCard";

export default function SearchResults({ products, query }) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200/90 bg-white px-6 py-20 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 text-3xl">
          🔍
        </div>

        <h2 className="mt-6 text-xl font-black text-slate-900">
          No products found for &quot;{query}&quot;
        </h2>

        <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
          We couldn&apos;t find anything matching your search. Try checking your spelling or search for popular terms like iPhone, MacBook, or Sony.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white transition hover:bg-blue-500"
        >
          Browse All Products →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">
          Showing <span className="font-bold text-slate-900">{products.length}</span>{" "}
          {products.length === 1 ? "product" : "products"} for &quot;{query}&quot;
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
