"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/constants/site";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-[#0b1220] text-slate-300">
      {/* Guarantees / Trust Row */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">100% Genuine Tech</h4>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Direct from official brands with manufacturer warranty.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Fast & Free Shipping</h4>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Free express shipping on all orders above ₹999.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">7 Days Easy Return</h4>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Hassle-free replacement for defective items.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">24/7 Expert Support</h4>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Dedicated customer care and technical support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-500/25">
                R
              </div>
              <div className="text-xl font-black tracking-tight text-white">
                R<span className="text-blue-500">Store</span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Your trusted destination for premium electronics. Flagship smartphones, high-performance laptops, immersive audio, gaming, and smart accessories engineered for tomorrow.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Subscribe for exclusive offers
              </h5>
              <form onSubmit={handleSubscribe} className="mt-3 flex max-w-md items-center gap-2">
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-white/10"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
                >
                  Join
                  <ArrowRight size={14} />
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 size={14} /> You're subscribed to RStore Tech Insider!
                </p>
              )}
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Categories
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/products?category=smartphones" className="transition hover:text-white">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=laptops" className="transition hover:text-white">
                  Laptops & MacBooks
                </Link>
              </li>
              <li>
                <Link href="/products?category=audio" className="transition hover:text-white">
                  Audio & Headphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=wearables" className="transition hover:text-white">
                  Smart Watches & Wearables
                </Link>
              </li>
              <li>
                <Link href="/products?category=gaming" className="transition hover:text-white">
                  Gaming Consoles
                </Link>
              </li>
              <li>
                <Link href="/products?category=cameras" className="transition hover:text-white">
                  Cameras & Drones
                </Link>
              </li>
              <li>
                <Link href="/products?category=monitors" className="transition hover:text-white">
                  4K Monitors & Displays
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/products" className="transition hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/offers" className="transition hover:text-white">
                  Hot Deals & Offers
                </Link>
              </li>
              <li>
                <Link href="/cart" className="transition hover:text-white">
                  My Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="transition hover:text-white">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/orders" className="transition hover:text-white">
                  Track My Orders
                </Link>
              </li>
              <li>
                <Link href="/profile" className="transition hover:text-white">
                  Account Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="block text-xs font-semibold text-slate-500">Toll Free Helpdesk:</span>
                <span className="font-bold text-white">{siteConfig.contact.phone}</span>
              </li>
              <li>
                <span className="block text-xs font-semibold text-slate-500">Email Support:</span>
                <span className="font-medium text-slate-300">{siteConfig.contact.email}</span>
              </li>
              <li className="pt-2">
                <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                  ● Support Active 24x7
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Payment methods & Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} RStore Electronics India. All rights reserved. Built with Next.js.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              UPI
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              Visa
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              MasterCard
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              RuPay
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              NetBanking
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
