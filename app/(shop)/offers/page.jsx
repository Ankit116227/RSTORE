"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Clock, Sparkles, ArrowRight, Tag, Zap } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/home/FeaturedProducts/ProductCard";

export default function OffersPage() {
  // Simple countdown timer for flash sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const offers = products
    .filter((p) => p.originalPrice && p.price < p.originalPrice)
    .sort((a, b) => b.discount - a.discount);

  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#0b1220] text-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 relative">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-cyan-400">
                <Flame size={14} className="text-amber-400" />
                <span>RStore Flash Deals</span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Exclusive Deals.
                <span className="block text-cyan-400">Premium Tech.</span>
              </h1>

              <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
                Take advantage of limited-time price drops on flagship smartphones, MacBooks, premium audio, and smart gear.
              </p>
            </div>

            {/* Flash Sale Countdown Timer Box */}
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Clock size={16} />
                <span>Deals Expire In</span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#0b1220] px-4 py-3 border border-white/10">
                  <span className="text-2xl font-black text-white font-mono sm:text-3xl">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Hours</span>
                </div>
                <span className="text-xl font-bold text-slate-500">:</span>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#0b1220] px-4 py-3 border border-white/10">
                  <span className="text-2xl font-black text-white font-mono sm:text-3xl">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Mins</span>
                </div>
                <span className="text-xl font-bold text-slate-500">:</span>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#0b1220] px-4 py-3 border border-white/10">
                  <span className="text-2xl font-black text-cyan-400 font-mono sm:text-3xl">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Limited Stock
            </span>
            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              All Active Discounts ({offers.length})
            </h2>
          </div>
          <p className="text-xs font-medium text-slate-500">
            *Discounts applied directly at checkout with free shipping.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {offers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
