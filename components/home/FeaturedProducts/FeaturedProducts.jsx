
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Featured collection
            </span>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0b1220] sm:text-4xl">
              Tech worth owning.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Handpicked electronics with great performance, premium design
              and exceptional value.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

