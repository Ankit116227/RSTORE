"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Top Badges & Wishlist */}
      <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between pointer-events-none">
        {product.badge ? (
          <span className="pointer-events-auto rounded-full bg-[#0b1220] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
            {product.badge}
          </span>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border bg-white/90 backdrop-blur shadow-sm transition hover:scale-110 active:scale-95 ${
            isSaved
              ? "border-red-200 text-red-500 shadow-red-100"
              : "border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500"
          }`}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart
            size={16}
            className={`transition ${isSaved ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </div>

      {/* Product Image Link */}
      <Link href={`/products/${product.slug}`} className="block overflow-hidden bg-slate-50/70 p-6">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>{product.brand}</span>
            <span className="text-slate-300">•</span>
            <span className="truncate text-blue-600">{product.category}</span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`} className="block mt-1.5">
            <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-slate-900 transition group-hover:text-blue-600">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200/50">
              {product.rating}
              <Star size={11} className="fill-amber-400 text-amber-400" />
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-3 flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-black text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-[11px] font-extrabold text-emerald-600">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition duration-200 active:scale-95 ${
            added
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
              : "bg-[#0b1220] text-white hover:bg-blue-600 shadow-sm"
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag size={15} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}