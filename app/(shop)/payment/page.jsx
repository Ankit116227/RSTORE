
"use client";

import Link from "next/link";
import { useState } from "react";

export default function PaymentPage() {
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const amount = 119999;

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      window.location.href = "/order-success";
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F0] px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[#777] transition hover:text-[#3E4E22]"
          >
            Home
          </Link>

          <span className="text-[#B5B5B5]">/</span>

          <Link
            href="/checkout"
            className="text-[#777] transition hover:text-[#3E4E22]"
          >
            Checkout
          </Link>

          <span className="text-[#B5B5B5]">/</span>

          <span className="font-bold text-[#3E4E22]">
            Payment
          </span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            RStore Secure Payment
          </p>

          <h1 className="text-3xl font-black tracking-tight text-[#1E1E1E] md:text-5xl">
            Choose your payment
          </h1>

          <p className="mt-3 text-sm text-[#777] md:text-base">
            Select a payment method to securely complete your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Payment Methods */}
          <section className="rounded-3xl border border-[#E5E1D6] bg-white p-6 shadow-[0_12px_40px_rgba(30,30,30,0.05)] md:p-8">

            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3E4E22] font-black text-white">
                01
              </div>

              <div>
                <h2 className="text-xl font-black text-[#1E1E1E]">
                  Payment Method
                </h2>

                <p className="mt-1 text-sm text-[#777]">
                  All transactions are protected.
                </p>
              </div>
            </div>

            <div className="space-y-4">

              {/* UPI */}
              <PaymentCard
                selected={method === "upi"}
                onClick={() => setMethod("upi")}
                icon="◉"
                title="UPI"
                description="Google Pay, PhonePe, Paytm and more"
              />

              {/* Card */}
              <PaymentCard
                selected={method === "card"}
                onClick={() => setMethod("card")}
                icon="▣"
                title="Credit / Debit Card"
                description="Visa, Mastercard, RuPay and more"
              />

              {/* Net Banking */}
              <PaymentCard
                selected={method === "netbanking"}
                onClick={() => setMethod("netbanking")}
                icon="⌂"
                title="Net Banking"
                description="All major Indian banks supported"
              />

              {/* COD */}
              <PaymentCard
                selected={method === "cod"}
                onClick={() => setMethod("cod")}
                icon="₹"
                title="Cash on Delivery"
                description="Pay when your order arrives"
              />

            </div>

            {/* Selected Method */}
            <div className="mt-8 rounded-2xl border border-[#E5E1D6] bg-[#FCFBF8] p-6">

              {method === "upi" && (
                <div>
                  <h3 className="font-black text-[#1E1E1E]">
                    Pay using UPI
                  </h3>

                  <p className="mt-2 text-sm text-[#777]">
                    Enter your UPI ID on the secure payment gateway.
                  </p>

                  <input
                    type="text"
                    placeholder="example@upi"
                    className="mt-5 w-full rounded-xl border border-[#DDD9CE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#3E4E22] focus:ring-4 focus:ring-[#3E4E22]/10"
                  />
                </div>
              )}

              {method === "card" && (
                <div>
                  <h3 className="font-black text-[#1E1E1E]">
                    Card Details
                  </h3>

                  <div className="mt-5 space-y-4">

                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full rounded-xl border border-[#DDD9CE] bg-white px-4 py-3 text-sm outline-none focus:border-[#3E4E22] focus:ring-4 focus:ring-[#3E4E22]/10"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full rounded-xl border border-[#DDD9CE] bg-white px-4 py-3 text-sm outline-none focus:border-[#3E4E22] focus:ring-4 focus:ring-[#3E4E22]/10"
                      />

                      <input
                        type="password"
                        placeholder="CVV"
                        className="w-full rounded-xl border border-[#DDD9CE] bg-white px-4 py-3 text-sm outline-none focus:border-[#3E4E22] focus:ring-4 focus:ring-[#3E4E22]/10"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "netbanking" && (
                <div>
                  <h3 className="font-black text-[#1E1E1E]">
                    Select your bank
                  </h3>

                  <select className="mt-5 w-full rounded-xl border border-[#DDD9CE] bg-white px-4 py-3 text-sm text-[#555] outline-none focus:border-[#3E4E22]">
                    <option>Select Bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Bank of Baroda</option>
                  </select>
                </div>
              )}

              {method === "cod" && (
                <div>
                  <h3 className="font-black text-[#1E1E1E]">
                    Cash on Delivery
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#777]">
                    Pay securely in cash when your RStore order
                    is delivered to your doorstep.
                  </p>

                  <div className="mt-4 rounded-xl bg-[#F4E4A6] p-4 text-sm font-semibold text-[#3E4E22]">
                    ✓ No online payment required
                  </div>
                </div>
              )}

            </div>

            {/* Security */}
            <div className="mt-6 flex gap-4 rounded-2xl bg-[#F8F6F0] p-5">
              <div className="text-2xl">
                🔐
              </div>

              <div>
                <h3 className="text-sm font-black text-[#1E1E1E]">
                  Your payment is secure
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#777]">
                  RStore uses secure payment technology to protect
                  your transaction and personal information.
                </p>
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-6 lg:self-start">

            <div className="overflow-hidden rounded-3xl border border-[#E5E1D6] bg-white shadow-[0_18px_60px_rgba(30,30,30,0.08)]">

              <div className="bg-[#3E4E22] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4E4A6]">
                  RStore
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Order Summary
                </h2>
              </div>

              <div className="p-6">

                {/* Product */}
                <div className="flex gap-4 border-b border-[#EEEAE0] pb-5">

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F8F6F0] text-3xl">
                    📱
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-black text-[#1E1E1E]">
                      Apple iPhone 16 Pro
                    </h3>

                    <p className="mt-1 text-xs text-[#777]">
                      Quantity: 1
                    </p>

                    <p className="mt-2 font-black text-[#3E4E22]">
                      ₹1,19,999
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-6 space-y-4">

                  <div className="flex justify-between text-sm">
                    <span className="text-[#777]">
                      Subtotal
                    </span>

                    <span className="font-bold">
                      ₹1,19,999
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#777]">
                      Delivery
                    </span>

                    <span className="font-bold text-[#3E4E22]">
                      FREE
                    </span>
                  </div>

                  <div className="border-t border-dashed border-[#D8D3C7] pt-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-[#777]">
                          Total
                        </p>

                        <p className="mt-1 text-xs text-[#999]">
                          Inclusive of taxes
                        </p>
                      </div>

                      <p className="text-2xl font-black text-[#1E1E1E]">
                        ₹1,19,999
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={processing}
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#D4AF37] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#1E1E1E] shadow-lg shadow-[#D4AF37]/20 transition hover:-translate-y-0.5 hover:bg-[#E4C34F] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing
                    ? "Processing..."
                    : `Pay ₹${amount.toLocaleString("en-IN")}`}

                  {!processing && (
                    <span className="text-lg">
                      →
                    </span>
                  )}
                </button>

                <Link
                  href="/checkout"
                  className="mt-4 block text-center text-sm font-bold text-[#3E4E22] hover:underline"
                >
                  ← Back to Checkout
                </Link>

              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-2xl border border-[#E5E1D6] bg-white p-4 text-center">
                <div className="text-xl">🔒</div>
                <p className="mt-2 text-xs font-bold text-[#555]">
                  Secure Payment
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E1D6] bg-white p-4 text-center">
                <div className="text-xl">✓</div>
                <p className="mt-2 text-xs font-bold text-[#555]">
                  Trusted Checkout
                </p>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* --------------------------------
   PAYMENT CARD
-------------------------------- */

function PaymentCard({
  selected,
  onClick,
  icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-[#3E4E22] bg-[#F8F6F0] shadow-sm"
          : "border-[#E5E1D6] bg-white hover:border-[#B8B1A1]"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-black ${
          selected
            ? "bg-[#3E4E22] text-white"
            : "bg-[#F4E4A6] text-[#3E4E22]"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-black text-[#1E1E1E]">
          {title}
        </h3>

        <p className="mt-1 text-xs text-[#777]">
          {description}
        </p>
      </div>

      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
          selected
            ? "border-[#3E4E22] bg-[#3E4E22] text-xs text-white"
            : "border-[#C9C4B8]"
        }`}
      >
        {selected && "✓"}
      </div>
    </button>
  );
}

