"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/data/products";

export default function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Suggestions filtered by query
  const suggestions = query.trim().length > 1
    ? products
        .filter((item) => {
          const q = query.toLowerCase();
          return (
            item.name.toLowerCase().includes(q) ||
            item.brand.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
          );
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  function handleSelectProduct(slug) {
    setIsOpen(false);
    setQuery("");
    router.push(`/products/${slug}`);
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="group flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
          <Search
            size={18}
            className="mr-2.5 shrink-0 text-slate-400 transition group-focus-within:text-blue-600"
          />

          <input
            type="search"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search iPhone, MacBook, Sony headphones, PS5..."
            className="w-full bg-transparent text-xs font-medium text-slate-900 outline-none placeholder:text-slate-400 sm:text-sm"
            aria-label="Search products"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="mr-1 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          <button
            type="submit"
            className="hidden shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-500 sm:block"
          >
            Search
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 1 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {suggestions.length > 0 ? (
            <div>
              <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>Matching Products</span>
                <span className="text-blue-600">{suggestions.length} found</span>
              </div>

              <div className="divide-y divide-slate-100">
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectProduct(item.slug)}
                    className="flex w-full items-center gap-3.5 rounded-xl p-2.5 text-left transition hover:bg-slate-50"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 p-1">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {item.brand} • {item.category}
                      </p>
                      <h4 className="truncate text-xs font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <p className="mt-0.5 text-xs font-black text-slate-900">
                        ₹{item.price.toLocaleString("en-IN")}{" "}
                        <span className="text-[10px] font-normal text-slate-400 line-through">
                          ₹{item.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </p>
                    </div>
                    <ArrowRight size={14} className="shrink-0 text-slate-400" />
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 p-2 text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  View all results for &quot;{query}&quot; →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-xs text-slate-500">
                No products found for &quot;{query}&quot;
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Try searching for &apos;iPhone&apos;, &apos;MacBook&apos;, &apos;Sony&apos;, or &apos;Gaming&apos;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
