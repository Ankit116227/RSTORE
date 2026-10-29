"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight, Star } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";

export default function WishlistPage() {
  const { addToCart } = useCart();
  const {
    wishlist,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const collectionValue = wishlist.reduce(
    (total, product) => total + (product.price || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Heart size={14} className="fill-blue-600" />
              <span>Saved Items</span>
            </div>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              My Wishlist
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Electronics and gadgets saved for future purchase.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
            >
              Explore More Tech
            </Link>

            {wishlist.length > 0 && (
              <button
                type="button"
                onClick={clearWishlist}
                className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        {wishlist.length > 0 && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Saved
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {wishlistCount} {wishlistCount === 1 ? "Item" : "Items"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Value
              </p>
              <p className="mt-1 text-2xl font-black text-blue-600">
                ₹{collectionValue.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Availability
              </p>
              <p className="mt-1 text-2xl font-black text-emerald-600">
                Ready to Ship
              </p>
            </div>
          </div>
        )}

        {/* Wishlist Items Grid */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {wishlist.map((product) => (
              <article
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={15} />
                </button>

                {/* Image */}
                <Link
                  href={`/products/${product.slug}`}
                  className="block bg-slate-50/70 p-6"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      {product.brand}
                    </span>

                    <Link href={`/products/${product.slug}`}>
                      <h3 className="mt-1 line-clamp-2 min-h-[38px] text-xs font-bold leading-5 text-slate-900 transition group-hover:text-blue-600 sm:text-sm">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base font-black text-slate-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0b1220] py-2.5 text-xs font-bold text-white transition hover:bg-blue-600"
                  >
                    <ShoppingBag size={14} />
                    Move to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
              <Heart size={36} />
            </div>

            <h2 className="mt-6 text-xl font-black text-slate-900">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-xs text-slate-500">
              Tap the heart icon on any product to save it to your wishlist and buy it later.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white transition hover:bg-blue-500"
            >
              Explore Products
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
