"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Truck, Clock, ArrowRight, ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("rstore-orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load orders:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const formatDate = (d) => {
    if (!d) return "Recently";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f8fc] px-4 py-16 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Account Overview
            </span>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              My Orders
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Review and track all your electronics purchases.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
              <Package size={36} />
            </div>
            <h2 className="mt-6 text-xl font-black text-slate-900">
              No orders placed yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-xs text-slate-500">
              Once you purchase your favorite smartphones, MacBooks or audio gear, they will show up here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white transition hover:bg-blue-500"
            >
              Explore Products
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => {
              const items = Array.isArray(order.items) ? order.items : [];
              return (
                <article
                  key={order.id || idx}
                  className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-4">
                    <div className="flex flex-wrap items-center gap-6 text-xs">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          Order Placed
                        </span>
                        <span className="font-bold text-slate-900">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          Total Amount
                        </span>
                        <span className="font-black text-slate-900">
                          ₹{Number(order.total || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          Ship To
                        </span>
                        <span className="font-bold text-slate-900 truncate max-w-[120px] block">
                          {order.address?.name || "Customer"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        {order.status || "Processing"}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        #{order.id}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="divide-y divide-slate-100">
                      {items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-4 py-3 first:pt-0">
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
                            <p className="text-[11px] text-slate-400">
                              Qty: {item.quantity || 1} • Unit Price: ₹{Number(item.price || 0).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-black text-slate-900">
                              ₹{(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Status & Info */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
                      <p className="text-slate-500">
                        Paid via <span className="font-bold text-slate-800 uppercase">{order.paymentMethod || "UPI"}</span>
                      </p>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Truck size={14} /> Express Delivery Active
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}