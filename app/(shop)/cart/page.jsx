"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Tag,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "@/components/providers/CartProvider";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "TECH10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try TECH10 for 10% off!");
    }
  };

  const discountAmount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const deliveryCharge = cartTotal >= 999 || cartTotal === 0 ? 0 : 99;
  const finalTotal = cartTotal - discountAmount + deliveryCharge;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb / Top Return */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Shopping Cart
            </span>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Your Cart
            </h1>
          </div>

          {cart.length > 0 && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm border border-slate-200">
              <ShoppingBag size={16} className="text-blue-600" />
              <span>
                {totalItems} {totalItems === 1 ? "Item" : "Items"} in Cart
              </span>
            </div>
          )}
        </div>

        {/* Empty Cart State */}
        {cart.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/90 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-inner">
              <ShoppingBag size={44} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              Your cart is currently empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Looks like you haven&apos;t added any electronics to your cart yet. Discover our latest smartphones, MacBooks, audio gear and deals.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500"
            >
              Explore Products
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Cart Items List */}
            <section className="space-y-4 lg:col-span-8">
              {cart.map((item) => {
                const itemTotal = item.price * item.quantity;

                return (
                  <article
                    key={item.id}
                    className="group flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:p-5"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-2 sm:h-32 sm:w-32"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 transition duration-300 group-hover:scale-105"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                              {item.brand} • {item.category}
                            </span>
                            <Link href={`/products/${item.slug}`}>
                              <h3 className="line-clamp-2 text-sm font-bold text-slate-900 transition hover:text-blue-600">
                                {item.name}
                              </h3>
                            </Link>
                          </div>

                          {/* Delete Item */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <p className="mt-2 text-base font-black text-slate-900">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="w-9 text-center text-xs font-black text-slate-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-semibold text-slate-400">Total:</span>
                          <p className="text-sm font-black text-slate-900">
                            ₹{itemTotal.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Order Summary Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-5 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-black text-slate-900">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code (TECH10)"
                        disabled={couponApplied}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-semibold uppercase text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={couponApplied}
                      className="rounded-xl bg-[#0b1220] px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600 disabled:bg-slate-300"
                    >
                      {couponApplied ? "Applied" : "Apply"}
                    </button>
                  </form>
                  {couponApplied && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <Check size={14} /> 10% Promo Discount Applied!
                    </p>
                  )}
                  {couponError && (
                    <p className="mt-1.5 text-xs text-red-500">{couponError}</p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 text-xs">
                  {/* Subtotal */}
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Coupon Discount */}
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount (10%)</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Truck size={14} />
                      Delivery
                    </span>
                    <span className="font-bold text-emerald-600">
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </span>
                  </div>

                  {deliveryCharge === 0 && (
                    <div className="rounded-xl bg-emerald-50 p-2.5 text-[11px] font-bold text-emerald-700">
                      ✓ You qualify for Free Express Shipping
                    </div>
                  )}
                </div>

                {/* Final Total */}
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500">Total Amount</p>
                      <p className="text-[10px] text-slate-400">Inclusive of all taxes</p>
                    </div>
                    <span className="text-2xl font-black text-slate-900">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 active:scale-95"
                >
                  Proceed to Checkout
                  <ArrowRight size={15} />
                </Link>

                {/* Guarantees */}
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-3 text-[11px] font-medium text-slate-500">
                  <ShieldCheck size={18} className="shrink-0 text-blue-600" />
                  <span>Safe & 256-Bit SSL Encrypted Checkout</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
