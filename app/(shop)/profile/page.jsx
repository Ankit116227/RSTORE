"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  UserRound,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);

  useEffect(() => {
    try {
      // User auth
      const savedAuth = localStorage.getItem("rstore-auth");
      const savedUser = localStorage.getItem("rstore-user");

      if (savedAuth) {
        setUser(JSON.parse(savedAuth));
      } else if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Orders
      const savedOrders = localStorage.getItem("rstore-orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      }

      // Wishlist
      const savedWishlist = localStorage.getItem("rstore-wishlist");
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          setWishlistCount(parsed.length);
        }
      }

      // Addresses
      const savedAddresses = localStorage.getItem("rstore-addresses");
      if (savedAddresses) {
        const parsed = JSON.parse(savedAddresses);
        if (Array.isArray(parsed)) {
          setAddressCount(parsed.length);
        }
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("rstore-auth");
    window.dispatchEvent(new Event("rstore-auth-changed"));
    router.push("/login");
  };

  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Account Center
          </span>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Manage your account details, purchases, and saved preferences.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit space-y-4 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm">
            {/* User Badge */}
            <div className="rounded-2xl bg-[#0b1220] p-5 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-md">
                {user?.name ? user.name.charAt(0).toUpperCase() : "R"}
              </div>

              <h2 className="mt-3 text-base font-bold truncate">
                {user?.name || "RStore Member"}
              </h2>

              <p className="truncate text-xs text-slate-400">
                {user?.email || "Signed in"}
              </p>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1 text-xs font-bold">
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-xl bg-blue-50 px-3.5 py-2.5 text-blue-600 font-extrabold"
              >
                <UserRound size={16} />
                <span>My Profile</span>
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
              >
                <Package size={16} className="text-slate-400" />
                <span>My Orders</span>
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
              >
                <Heart size={16} className="text-slate-400" />
                <span>Wishlist</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
              >
                <Settings size={16} className="text-slate-400" />
                <span>Settings</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left font-bold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="space-y-6">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-[#0b1220] p-8 text-white shadow-lg">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-600/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />

              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Welcome to RStore
                </span>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Hello, {user?.name?.split(" ")[0] || "Shopper"} 👋
                </h2>

                <p className="mt-2 max-w-lg text-xs leading-5 text-slate-300">
                  Track your electronics orders, manage delivery addresses, and stay updated with exclusive tech deals.
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Total Orders
                  </span>
                  <Package size={18} className="text-blue-600" />
                </div>
                <p className="mt-3 text-2xl font-black text-slate-900">
                  {orders.length}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  {orders.length === 1 ? "Order placed" : "Orders placed"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Saved Wishlist
                  </span>
                  <Heart size={18} className="text-red-500" />
                </div>
                <p className="mt-3 text-2xl font-black text-slate-900">
                  {wishlistCount}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Items bookmarked
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Total Spending
                  </span>
                  <ShoppingBag size={18} className="text-emerald-600" />
                </div>
                <p className="mt-3 text-2xl font-black text-slate-900">
                  ₹{totalSpent.toLocaleString("en-IN")}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Lifetime purchases
                </p>
              </div>
            </div>

            {/* Account Details Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-black text-slate-900">
                  Personal Information
                </h3>
                <Link
                  href="/settings"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Edit Settings
                </Link>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400">
                    Full Name
                  </span>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {user?.name || "Member"}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400">
                    Email Address
                  </span>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {user?.email || "Not specified"}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400">
                    Phone Number
                  </span>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {user?.phone || "+91 98765 43210"}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400">
                    Account Status
                  </span>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <ShieldCheck size={14} /> Verified Buyer
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-black text-slate-900">
                  Recent Orders
                </h3>
                <Link
                  href="/orders"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  View All ({orders.length}) →
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="mt-4 divide-y divide-slate-100">
                  {orders.slice(0, 3).map((o, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3.5 first:pt-0">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-600">
                          #{o.id}
                        </span>
                        <p className="text-[11px] text-slate-400">
                          {o.items?.length || 1} items • ₹{Number(o.total || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                        {o.status || "Processing"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-xs text-slate-500">
                  No orders placed yet. Start exploring products!
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}