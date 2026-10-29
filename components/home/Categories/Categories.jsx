
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
} from "lucide-react";

const categories = [
  {
    name: "Smartphones",
    description: "Latest mobile technology",
    href: "/products?category=smartphones",
    icon: Smartphone,
  },
  {
    name: "Laptops",
    description: "Work & performance",
    href: "/products?category=laptops",
    icon: Laptop,
  },
  {
    name: "Audio",
    description: "Music without limits",
    href: "/products?category=audio",
    icon: Headphones,
  },
  {
    name: "Gaming",
    description: "Level up your game",
    href: "/products?category=gaming",
    icon: Gamepad2,
  },
  {
    name: "Wearables",
    description: "Smart everyday living",
    href: "/products?category=wearables",
    icon: Watch,
  },
  {
    name: "Cameras",
    description: "Capture every moment",
    href: "/products?category=cameras",
    icon: Camera,
  },
  {
    name: "Monitors",
    description: "Sharper. Bigger. Better.",
    href: "/products?category=monitors",
    icon: Monitor,
  },
  {
    name: "Components",
    description: "Build your setup",
    href: "/products?category=components",
    icon: Cpu,
  },
];

export default function Categories() {
  return (
    <section className="bg-[#f6f8fc] px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Shop by category
            </span>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0b1220] sm:text-4xl">
              Find your tech.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Explore our collection of premium electronics, carefully
              selected for performance, quality and everyday use.
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-bold text-blue-600 transition hover:text-blue-700"
          >
            View all products →
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-700 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-1 text-[11px] leading-4 text-slate-400">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

