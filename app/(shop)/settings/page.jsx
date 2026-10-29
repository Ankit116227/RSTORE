"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserRound, Package, Heart, Settings, LogOut, Check, Bell, Shield, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("rstore-auth");
      const savedUser = localStorage.getItem("rstore-user");

      if (savedAuth) {
        const u = JSON.parse(savedAuth);
        setUser(u);
        setName(u.name || "");
        setEmail(u.email || "");
        setPhone(u.phone || "");
      } else if (savedUser) {
        const u = JSON.parse(savedUser);
        setUser(u);
        setName(u.name || "");
        setEmail(u.email || "");
        setPhone(u.phone || "");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...(user || {}),
      name,
      email,
      phone,
    };
    localStorage.setItem("rstore-auth", JSON.stringify(updated));
    localStorage.setItem("rstore-user", JSON.stringify(updated));
    window.dispatchEvent(new Event("rstore-auth-changed"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("rstore-auth");
    window.dispatchEvent(new Event("rstore-auth-changed"));
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Account Preferences
          </span>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Account Settings
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Update personal info, contact details, and notification preferences.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Navigation Sidebar */}
          <aside className="h-fit space-y-1 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm text-xs font-bold">
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            >
              <UserRound size={16} className="text-slate-400" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/orders"
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            >
              <Package size={16} className="text-slate-400" />
              <span>My Orders</span>
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            >
              <Heart size={16} className="text-slate-400" />
              <span>Wishlist</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-3.5 py-2.5 text-blue-600 font-extrabold"
            >
              <Settings size={16} />
              <span>Settings</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </aside>

          {/* Settings Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSave} className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-4">
                Personal Profile Details
              </h2>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Notification Preferences
                </h3>

                <div className="mt-4 space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Bell size={16} className="text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">Order Updates & Shipping</p>
                        <p className="text-[11px] text-slate-400">Receive SMS and email status for deliveries</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="h-4 w-4 rounded text-blue-600"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-2.5">
                      <Shield size={16} className="text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">Exclusive Tech Deals & Coupons</p>
                        <p className="text-[11px] text-slate-400">Get early notifications on price drops</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={dealAlerts}
                      onChange={(e) => setDealAlerts(e.target.checked)}
                      className="h-4 w-4 rounded text-blue-600"
                    />
                  </label>
                </div>
              </div>

              {/* Save CTA */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                {saved && (
                  <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <Check size={16} /> Preferences saved successfully!
                  </p>
                )}
                {!saved && <span />}

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}