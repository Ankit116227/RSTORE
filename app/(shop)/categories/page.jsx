import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Watch,
  Camera,
  Monitor,
  Cpu,
  Tablet,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    slug: "smartphones",
    name: "Smartphones",
    description: "Flagship iOS and Android phones with pro camera systems",
    icon: Smartphone,
    count: "Flagships Available",
  },
  {
    slug: "laptops",
    name: "Laptops & MacBooks",
    description: "High performance machines for coding, creator workflows & everyday speed",
    icon: Laptop,
    count: "M4 & Ultra Fast",
  },
  {
    slug: "audio",
    name: "Audio & Headphones",
    description: "Noise-cancelling wireless headphones, earbuds & high-fidelity sound",
    icon: Headphones,
    count: "Studio Audio",
  },
  {
    slug: "wearables",
    name: "Smart Watches & Wearables",
    description: "Fitness trackers, cellular smartwatches & everyday health monitors",
    icon: Watch,
    count: "Always On Retina",
  },
  {
    slug: "gaming",
    name: "Gaming Consoles & Gear",
    description: "Next-gen consoles, 4K 120fps graphics & immersive controllers",
    icon: Gamepad2,
    count: "Ray Tracing Ready",
  },
  {
    slug: "cameras",
    name: "Cameras & Drones",
    description: "Full-frame mirrorless cameras, 4K aerial drones & lenses",
    icon: Camera,
    count: "4K 60fps HDR",
  },
  {
    slug: "monitors",
    name: "4K Displays & Monitors",
    description: "UltraSharp IPS color-accurate monitors & high-refresh displays",
    icon: Monitor,
    count: "True 4K UHD",
  },
  {
    slug: "tablets",
    name: "iPads & Tablets",
    description: "Liquid Retina multi-touch displays for illustration and productivity",
    icon: Tablet,
    count: "M2 & Pencil Ready",
  },
  {
    slug: "components",
    name: "Custom Tech & Peripherals",
    description: "Mechanical keyboards, studio mice & workspace peripherals",
    icon: Cpu,
    count: "Pro Setup",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc]">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sparkles size={14} />
            <span>Curated Collections</span>
          </div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Browse by Category
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Explore our curated catalog of consumer tech and electronics engineered for excellence.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {category.count}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
