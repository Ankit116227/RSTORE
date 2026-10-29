"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X, Smartphone, Laptop, Headphones, Gamepad2, Watch, Camera, Monitor, Tag, Home, ShoppingBag } from "lucide-react";
import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#0b1220] text-slate-300">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-wide sm:text-xs">
            <Zap size={13} className="text-cyan-400 shrink-0" />
            <span>Free Express Delivery on orders above ₹999</span>
            <span className="hidden text-slate-600 sm:inline">•</span>
            <span className="hidden text-cyan-400 font-bold sm:inline">Use code TECH10 for 10% OFF</span>
          </p>
          <div className="hidden items-center gap-4 text-[11px] font-medium text-slate-400 md:flex">
            <Link href="/orders" className="hover:text-white transition">Track Order</Link>
            <span>•</span>
            <Link href="/offers" className="hover:text-white transition text-cyan-300">Hot Deals</Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Mobile Menu Toggle + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5"
              aria-label="RStore Home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1220] shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-blue-600">
                <span className="text-xl font-black text-white">R</span>
              </div>

              <div>
                <div className="text-xl font-black tracking-tight text-[#0b1220]">
                  R<span className="text-blue-600">Store</span>
                </div>
                <div className="-mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Tech • Simplified
                </div>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-2">
            <HeaderSearch />
          </div>

          {/* Action Icons */}
          <HeaderActions />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden border-t border-slate-100 lg:block">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <NavLink href="/" label="Home" currentPath={pathname} />
            <NavLink href="/products" label="All Products" currentPath={pathname} />
            <NavLink href="/products?category=smartphones" label="Smartphones" currentPath={pathname} />
            <NavLink href="/products?category=laptops" label="Laptops" currentPath={pathname} />
            <NavLink href="/products?category=audio" label="Audio" currentPath={pathname} />
            <NavLink href="/products?category=gaming" label="Gaming" currentPath={pathname} />
            <NavLink href="/categories" label="All Categories" currentPath={pathname} />
          </div>

          <Link
            href="/offers"
            className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            <Tag size={13} />
            Special Deals
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[108px] z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Content */}
          <div className="relative h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Menu
              </p>
              <div className="mt-3 space-y-1">
                <MobileNavLink href="/" icon={Home} label="Home" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink href="/products" icon={ShoppingBag} label="All Products" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink href="/offers" icon={Tag} label="Deals & Offers" onClick={() => setMobileMenuOpen(false)} highlight />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Categories
              </p>
              <div className="mt-3 space-y-1">
                <MobileNavLink href="/products?category=smartphones" icon={Smartphone} label="Smartphones" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink href="/products?category=laptops" icon={Laptop} label="Laptops" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink href="/products?category=audio" icon={Headphones} label="Audio & Headphones" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink href="/products?category=gaming" icon={Gamepad2} label="Gaming Consoles" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink href="/products?category=wearables" icon={Watch} label="Wearables & Watches" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink href="/products?category=cameras" icon={Camera} label="Cameras & Drones" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink href="/products?category=monitors" icon={Monitor} label="4K Monitors" onClick={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label, currentPath }) {
  const isActive = currentPath === href;
  return (
    <Link
      href={href}
      className={`text-xs font-bold transition tracking-wide ${
        isActive
          ? "text-blue-600 font-extrabold"
          : "text-slate-600 hover:text-blue-600"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, icon: Icon, label, onClick, highlight }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
        highlight
          ? "bg-blue-50 text-blue-600 font-bold"
          : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
      }`}
    >
      <Icon size={18} className={highlight ? "text-blue-600" : "text-slate-400"} />
      {label}
    </Link>
  );
}
