"use client";

import { useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles } from "lucide-react";

import { products } from "@/data/products";
import SearchResults from "@/components/search/SearchResults";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchResults = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return products;
    }

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const brand = product.brand?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";

      return (
        name.includes(search) ||
        brand.includes(search) ||
        category.includes(search) ||
        description.includes(search)
      );
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Search Results</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sparkles size={14} />
            <span>Search Discovery</span>
          </div>

          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {query ? (
              <>
                Results for <span className="text-blue-600">&quot;{query}&quot;</span>
              </>
            ) : (
              "Explore All Electronics"
            )}
          </h1>

          <p className="mt-2 text-xs text-slate-500 sm:text-sm">
            Instant search across flagship phones, MacBooks, studio audio, and gaming gear.
          </p>
        </div>

        {/* Search Bar Form */}
        <form action="/search" className="mb-8 flex gap-2 sm:max-w-xl">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search by brand, category, or model..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-xs font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white transition hover:bg-blue-500"
          >
            Search
          </button>
        </form>

        {/* Popular Tags */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Trending Searches:</span>
          {["iPhone 16", "MacBook", "Sony", "PlayStation 5", "Apple Watch", "Drone"].map((tag) => (
            <Link
              key={tag}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-500 hover:text-blue-600"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Results */}
        <SearchResults products={searchResults} query={query} />
      </div>
    </main>
  );
}
