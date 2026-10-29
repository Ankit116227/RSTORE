"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingBag,
  UserRound,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";

export default function HeaderActions() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const loadAuth = () => {
      try {
        const savedAuth = localStorage.getItem("rstore-auth");
        if (savedAuth) {
          setAuth(JSON.parse(savedAuth));
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error("Auth loading failed:", error);
        setAuth(null);
      }
    };

    loadAuth();
    window.addEventListener("rstore-auth-changed", loadAuth);
    return () => {
      window.removeEventListener("rstore-auth-changed", loadAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("rstore-auth");
    window.dispatchEvent(new Event("rstore-auth-changed"));
    router.push("/login");
  };

  const accountName = auth?.name || "Sign In";

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      {/* Wishlist */}
      <Link
        href="/wishlist"
        className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent transition hover:border-slate-200 hover:bg-slate-50"
        aria-label={`Wishlist (${wishlistCount} items)`}
      >
        <Heart
          size={20}
          className={`transition ${
            wishlistCount > 0
              ? "fill-red-500 text-red-500"
              : "text-slate-700 group-hover:text-red-500"
          }`}
        />
        {wishlistCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
            {wishlistCount > 99 ? "99+" : wishlistCount}
          </span>
        )}
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent transition hover:border-slate-200 hover:bg-slate-50"
        aria-label={`Shopping cart (${cartCount} items)`}
      >
        <ShoppingBag
          size={20}
          className="text-slate-700 transition group-hover:text-blue-600"
        />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>

      {/* Account Dropdown */}
      <div className="group relative">
        <Link
          href={auth?.isLoggedIn ? "/profile" : "/login"}
          className="flex h-10 items-center gap-2 rounded-xl border border-transparent px-2 transition hover:border-slate-200 hover:bg-slate-50"
          aria-label="Account"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0b1220] text-xs font-bold text-white">
            {auth?.isLoggedIn ? auth.name.charAt(0).toUpperCase() : <UserRound size={15} />}
          </div>

          <div className="hidden text-left xl:block">
            <p className="text-[10px] font-medium leading-none text-slate-400">
              {auth?.isLoggedIn ? "Welcome" : "Account"}
            </p>
            <p className="max-w-[90px] truncate text-xs font-bold leading-tight text-slate-900">
              {accountName}
            </p>
          </div>
        </Link>

        {auth?.isLoggedIn && (
          <div className="invisible absolute right-0 top-full mt-2 w-52 translate-y-1 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <div className="border-b border-slate-100 px-3 py-2">
              <p className="text-[11px] text-slate-400">Signed in as</p>
              <p className="truncate text-xs font-bold text-slate-900">
                {auth.name}
              </p>
              <p className="truncate text-[10px] text-slate-500">
                {auth.email}
              </p>
            </div>

            <div className="py-1">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
              >
                <UserRound size={14} className="text-slate-400" />
                My Profile
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
              >
                <Package size={14} className="text-slate-400" />
                My Orders
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
              >
                <Settings size={14} className="text-slate-400" />
                Settings
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-1">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}