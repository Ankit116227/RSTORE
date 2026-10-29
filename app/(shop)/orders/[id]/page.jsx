"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Truck, MapPin, CreditCard } from "lucide-react";

export default function OrderDetailPage({ params }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("rstore-orders") || "[]");
      const found = savedOrders.find((o) => o.id === orderId || o.id === decodeURIComponent(orderId));
      if (found) {
        setOrder(found);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f8fc] px-4 py-16 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f6f8fc] px-4 py-16 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-xl font-black text-slate-900">Order Not Found</h2>
          <p className="mt-2 text-xs text-slate-500">
            We couldn&apos;t find the order details for ID #{orderId}.
          </p>
          <Link
            href="/orders"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={14} />
          Back to all orders
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Order Details
              </span>
              <h1 className="mt-1 text-2xl font-black text-slate-900">
                #{order.id}
              </h1>
            </div>

            <span className="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
              {order.status || "Processing"}
            </span>
          </div>

          {/* Items */}
          <div className="mt-6 divide-y divide-slate-100">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 py-3.5 first:pt-0">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-1">
                  <Image
                    src={item.image || "/products/iphone-16-pro.jpg"}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">Quantity: {item.quantity || 1}</p>
                  <p className="text-xs font-black text-slate-900">
                    ₹{(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 border-t border-slate-100 pt-6 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">₹{order.subtotal?.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery</span>
              <span className="font-bold text-emerald-600">
                {order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-black text-slate-900">
              <span>Total Paid</span>
              <span>₹{order.total?.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}