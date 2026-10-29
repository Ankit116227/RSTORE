"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, Zap, Check, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";

export default function ProductActions({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const saved = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    router.push("/checkout");
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Quantity:
        </span>
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-black text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Cart & Buy Now Buttons */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex h-13 items-center justify-center gap-2.5 rounded-xl text-sm font-bold shadow-lg transition duration-200 active:scale-[0.98] ${
            added
              ? "bg-emerald-600 text-white shadow-emerald-500/25"
              : "bg-[#0b1220] text-white hover:bg-slate-800 shadow-slate-900/10"
          }`}
        >
          {added ? (
            <>
              <Check size={18} />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              Add to Cart
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex h-13 items-center justify-center gap-2.5 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:bg-blue-500 active:scale-[0.98]"
        >
          <Zap size={18} />
          Instant Buy Now
        </button>
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-xs font-bold transition active:scale-[0.98] ${
          saved
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        }`}
      >
        <Heart size={16} className={saved ? "fill-red-500 text-red-500" : ""} />
        {saved ? "Saved in your Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
}
