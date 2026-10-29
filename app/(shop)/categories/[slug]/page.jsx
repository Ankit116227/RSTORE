import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/home/FeaturedProducts/ProductCard";

const categoryMeta = {
  smartphones: {
    name: "Smartphones",
    description: "Discover flagship iPhones and Galaxy devices with advanced multi-lens cameras, OLED displays, and all-day battery life.",
  },
  laptops: {
    name: "Laptops & MacBooks",
    description: "High performance laptops built for software engineering, video editing, creative design, and portable multitasking.",
  },
  audio: {
    name: "Audio & Headphones",
    description: "Immerse yourself in crystal-clear acoustics with active noise-cancellation, spatial audio, and long battery life.",
  },
  wearables: {
    name: "Smart Watches & Wearables",
    description: "Track your health metrics, ECG, fitness workouts, and stay seamlessly connected with Retina displays.",
  },
  gaming: {
    name: "Gaming Consoles",
    description: "Play without limits with 4K 120fps graphics, ultra-fast SSD storage, ray tracing, and haptic feedback.",
  },
  cameras: {
    name: "Cameras & Drones",
    description: "Capture cinematic 4K HDR footage, professional RAW portraits, and breathtaking aerial video.",
  },
  monitors: {
    name: "4K Displays & Monitors",
    description: "UltraSharp IPS color-accurate panels, USB-C 90W single-cable power delivery, and high-resolution visuals.",
  },
  tablets: {
    name: "iPads & Tablets",
    description: "Versatile tablets powered by desktop-class chips, Liquid Retina screens, and stylus precision.",
  },
  components: {
    name: "Custom Peripherals",
    description: "Premium mechanical keyboards, ergonomic accessories, and desk setup essentials.",
  },
};

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const meta = categoryMeta[slug];

  if (!meta) {
    notFound();
  }

  const categoryProducts = products.filter((item) => {
    return (
      item.category.toLowerCase() === slug.toLowerCase() ||
      item.category.toLowerCase().includes(slug.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      {/* Header Banner */}
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition mb-4"
          >
            <ArrowLeft size={14} />
            All Categories
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Sparkles size={14} />
                <span>RStore Category</span>
              </div>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                {meta.name}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                {meta.description}
              </p>
            </div>

            <span className="text-xs font-bold text-slate-500">
              {categoryProducts.length} {categoryProducts.length === 1 ? "Product" : "Products"} Available
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
            <h3 className="text-xl font-black text-slate-900">
              New arrivals coming soon
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              We&apos;re currently restocking premier items in this category.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-500"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
