import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  RotateCcw,
  Sparkles,
  Star,
  CheckCircle2,
  Flame,
  Zap,
} from "lucide-react";

import Categories from "@/components/home/Categories/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts/FeaturedProducts";
import ProductCard from "@/components/home/FeaturedProducts/ProductCard";
import { products } from "@/data/products";

export default function HomePage() {
  const hotDeals = products.filter((p) => p.discount >= 10).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0b1220] text-white">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[100px]" />

        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-cyan-400 backdrop-blur">
                <Sparkles size={14} className="text-cyan-400" />
                <span>Next-Gen Tech is Here</span>
                <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] text-cyan-300">
                  2026 Collection
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
                Technology.
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Simplified.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Discover flagship smartphones, high-performance MacBooks, studio-grade audio, and smart gear designed for the way you create, work and play.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-blue-500 active:scale-95"
                >
                  Explore All Tech
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/offers"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
                >
                  <Flame size={16} className="text-amber-400" />
                  View Hot Deals
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-black text-white sm:text-3xl">100%</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">Authentic Tech</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white sm:text-3xl">50k+</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white sm:text-3xl">24/7</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">Expert Care</p>
                </div>
              </div>
            </div>

            {/* Right Hero Product Card Spotlight */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-2xl shadow-2xl">
                <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                  Featured Flagship
                </div>

                <div className="relative mx-auto h-64 w-full">
                  <Image
                    src="/products/iphone-16-pro.jpg"
                    alt="Apple iPhone 16 Pro"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <div className="mt-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                    Apple • Smartphones
                  </span>
                  <h3 className="mt-1 text-xl font-black text-white">
                    Apple iPhone 16 Pro
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    A18 Pro chip, 48MP Fusion camera, Grade 5 Titanium frame.
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <span className="text-2xl font-black text-white">₹1,19,999</span>
                      <span className="ml-2 text-xs text-slate-400 line-through">₹1,29,999</span>
                    </div>

                    <Link
                      href="/products/apple-iphone-16-pro"
                      className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <Categories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Flash Sale / Today's Deals Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-[#0b1220] px-6 py-16 text-white lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400">
                <Zap size={14} />
                <span>Limited Time Offers</span>
              </div>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Top Value Deals
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Save up to 15% with exclusive instant discounts on premier electronics.
              </p>
            </div>

            <Link
              href="/offers"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
            >
              Explore all deals →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {hotDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Authorized Official Retailer For
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale transition hover:grayscale-0">
            <span className="text-xl font-black tracking-tighter text-slate-900 sm:text-2xl">Apple</span>
            <span className="text-xl font-black tracking-tighter text-slate-900 sm:text-2xl">SAMSUNG</span>
            <span className="text-xl font-black tracking-tighter text-slate-900 sm:text-2xl">SONY</span>
            <span className="text-xl font-black tracking-tighter text-slate-900 sm:text-2xl">DELL</span>
            <span className="text-xl font-black tracking-tighter text-slate-900 sm:text-2xl">DJI</span>
            <span className="text-xl font-black tracking-tighter text-slate-900 sm:text-2xl">Keychron</span>
          </div>
        </div>
      </section>

      {/* Benefits & Guarantees */}
      <section className="mx-auto grid max-w-[1440px] gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <BenefitCard
          icon={<ShieldCheck size={24} />}
          title="100% Genuine Tech"
          description="Direct from authorized brand partners with full manufacturer warranty."
        />
        <BenefitCard
          icon={<Truck size={24} />}
          title="Lightning Fast Delivery"
          description="Free express shipping on all orders over ₹999 across India."
        />
        <BenefitCard
          icon={<RotateCcw size={24} />}
          title="7-Day Easy Replacement"
          description="Hassle-free replacement policy if your product arrives damaged or defective."
        />
        <BenefitCard
          icon={<Headphones size={24} />}
          title="24/7 Expert Support"
          description="Dedicated tech enthusiasts ready to assist with your questions and setup."
        />
      </section>
    </main>
  );
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}
