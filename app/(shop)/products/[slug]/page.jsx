import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Sparkles,
} from "lucide-react";

import { products } from "@/data/products";
import ProductActions from "@/components/products/ProductActions";
import ProductGallery from "@/components/products/ProductGallery";
import PincodeChecker from "@/components/products/PincodeChecker";
import ProductCard from "@/components/home/FeaturedProducts/ProductCard";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or brand
  const relatedProducts = products
    .filter((item) => item.id !== product.id && (item.category === product.category || item.brand === product.brand))
    .slice(0, 4);

  const fallbackRelated = relatedProducts.length > 0
    ? relatedProducts
    : products.filter((item) => item.id !== product.id).slice(0, 4);

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-4 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="transition hover:text-blue-600">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/products" className="transition hover:text-blue-600">Products</Link>
            <span className="text-slate-300">/</span>
            <Link
              href={`/products?category=${product.category.toLowerCase()}`}
              className="transition hover:text-blue-600"
            >
              {product.category}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="max-w-[200px] truncate text-slate-900 font-bold sm:max-w-none">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm lg:p-10">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: Product Gallery */}
            <div className="lg:col-span-6">
              <ProductGallery
                images={product.gallery || [product.image]}
                name={product.name}
                badge={product.badge}
              />
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                {/* Brand & Stock Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                    {product.brand} Official
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    In Stock • Ready to Ship
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200/60">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {product.reviews} verified buyer reviews
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-bold text-blue-600">
                    {product.category}
                  </span>
                </div>

                {/* Price Box */}
                <div className="mt-6 rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-3xl font-black text-slate-900 sm:text-4xl">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    {product.originalPrice && (
                      <span className="text-base text-slate-400 line-through">
                        MRP ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}

                    {product.discount > 0 && (
                      <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-black text-white">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {savings > 0 && (
                    <p className="mt-2 text-xs font-bold text-emerald-700">
                      You save ₹{savings.toLocaleString("en-IN")} on this order (Inclusive of all taxes)
                    </p>
                  )}
                </div>

                {/* Marketing Description */}
                {product.description && (
                  <p className="mt-6 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                )}

                {/* Color Options if available */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Available Finishes:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.colors.map((c, i) => (
                        <span
                          key={c}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                            i === 0
                              ? "border-2 border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                              : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features Bullet Points */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Highlights:
                    </p>
                    <ul className="mt-3 space-y-2 text-xs font-medium text-slate-700">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pincode Estimator */}
                <div className="mt-6">
                  <PincodeChecker />
                </div>

                {/* Add to Cart / Buy Now / Wishlist */}
                <ProductActions product={product} />

                {/* Trust Guarantees */}
                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-center">
                  <div className="flex flex-col items-center">
                    <ShieldCheck size={20} className="text-blue-600" />
                    <span className="mt-1 text-[11px] font-bold text-slate-800">100% Genuine</span>
                    <span className="text-[10px] text-slate-400">Brand Warranty</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck size={20} className="text-blue-600" />
                    <span className="mt-1 text-[11px] font-bold text-slate-800">Free Delivery</span>
                    <span className="text-[10px] text-slate-400">Fast Dispatch</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw size={20} className="text-blue-600" />
                    <span className="mt-1 text-[11px] font-bold text-slate-800">7 Days Return</span>
                    <span className="text-[10px] text-slate-400">Easy Replacement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          {product.specs && (
            <div className="mt-16 border-t border-slate-100 pt-10">
              <h2 className="text-xl font-black text-slate-900">
                Technical Specifications
              </h2>
              <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`grid grid-cols-1 gap-2 p-4 sm:grid-cols-3 ${
                      idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {key}
                    </span>
                    <span className="text-xs font-semibold text-slate-900 sm:col-span-2">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Recommended for you
            </span>
            <h2 className="mt-1 text-2xl font-black text-slate-900">
              Related Products
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {fallbackRelated.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
