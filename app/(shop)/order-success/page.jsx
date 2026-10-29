"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rstore-last-order");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error reading last order:", e);
    }
  }, []);

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f6f8fc] px-4 py-16 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <ShoppingBag size={32} />
          </div>
          <h1 className="mt-4 text-xl font-black text-slate-900">
            Order Confirmation
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Check your orders page to view previously placed orders.
          </p>
          <Link
            href="/orders"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white hover:bg-blue-500"
          >
            View My Orders
          </Link>
        </div>
      </main>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Success Banner */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm sm:p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-inner">
            <CheckCircle2 size={48} className="stroke-[2.5]" />
          </div>

          <span className="mt-6 inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
            Order Confirmed
          </span>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Thank You for Your Order!
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            We&apos;ve received your order and our fulfillment team is preparing your package for express dispatch.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700">
            <span>Order ID:</span>
            <span className="font-mono text-blue-600">{order.id}</span>
          </div>

          {/* Progress Timeline */}
          <div className="mt-10 border-t border-slate-100 pt-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <TimelineStep number="1" label="Order Placed" status="Completed" active />
              <TimelineStep number="2" label="Processing" status="In Progress" active />
              <TimelineStep number="3" label="Shipped" status="Pending" />
              <TimelineStep number="4" label="Delivered" status="Pending" />
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          {/* Ordered Items List */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm md:col-span-7">
            <h3 className="text-base font-black text-slate-900">
              Purchased Items ({items.length})
            </h3>

            <div className="mt-4 divide-y divide-slate-100">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 first:pt-0">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-1">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-xs font-bold text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                    <p className="text-xs font-black text-slate-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-emerald-600">
                  {order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-sm font-black text-slate-900">
                <span>Total Amount</span>
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="space-y-6 md:col-span-5">
            {/* Delivery Address */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <MapPin size={15} className="text-blue-600" />
                <span>Delivery Address</span>
              </div>
              <h4 className="mt-2 text-xs font-bold text-slate-900">
                {order.address?.name}
              </h4>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {order.address?.address}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Phone: {order.address?.phone}
              </p>
            </div>

            {/* Payment Info */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <CreditCard size={15} className="text-blue-600" />
                <span>Payment Method</span>
              </div>
              <p className="mt-2 text-xs font-bold text-slate-900 uppercase">
                {order.paymentMethod === "upi" ? "UPI Payment" : order.paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}
              </p>
              <p className="mt-1 text-[11px] text-emerald-600 font-semibold">
                ✓ Order placed securely
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/orders"
            className="rounded-xl bg-[#0b1220] px-6 py-3 text-xs font-bold text-white transition hover:bg-blue-600"
          >
            Go to My Orders
          </Link>
          <Link
            href="/products"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

function TimelineStep({ number, label, status, active }) {
  return (
    <div className={`rounded-2xl border p-4 text-center ${active ? "border-blue-200 bg-blue-50/50" : "border-slate-100 bg-slate-50/50"}`}>
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${active ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"}`}>
        {number}
      </span>
      <p className="mt-2 text-xs font-bold text-slate-900">{label}</p>
      <p className={`mt-0.5 text-[10px] font-semibold ${active ? "text-blue-600" : "text-slate-400"}`}>
        {status}
      </p>
    </div>
  );
}