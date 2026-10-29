"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Lock,
  ArrowLeft,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    landmark: "",
  });

  const cartItems = cart || [];
  const subtotal = Number(cartTotal || 0);
  const deliveryCharge = subtotal === 0 || subtotal >= 999 ? 0 : 99;
  const total = subtotal + deliveryCharge;

  // Load saved addresses from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rstore-addresses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedAddresses(parsed);
          const defaultAddr = parsed.find((item) => item.isDefault) || parsed[0];
          setSelectedAddressId(defaultAddr.id);
          setAddress({
            name: defaultAddr.name || "",
            phone: defaultAddr.phone || "",
            pincode: defaultAddr.pincode || "",
            city: defaultAddr.city || "",
            state: defaultAddr.state || "",
            address: defaultAddr.address || "",
            landmark: defaultAddr.landmark || "",
          });
        } else {
          setUseNewAddress(true);
        }
      } else {
        setUseNewAddress(true);
      }
    } catch (error) {
      console.error("Failed to load saved addresses:", error);
      setUseNewAddress(true);
    }
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSelectedAddressId(null);
  };

  const selectSavedAddress = (savedAddr) => {
    setSelectedAddressId(savedAddr.id);
    setUseNewAddress(false);
    setAddress({
      name: savedAddr.name || "",
      phone: savedAddr.phone || "",
      pincode: savedAddr.pincode || "",
      city: savedAddr.city || "",
      state: savedAddr.state || "",
      address: savedAddr.address || "",
      landmark: savedAddr.landmark || "",
    });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !address.name.trim() ||
      !address.phone.trim() ||
      !address.pincode.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.address.trim()
    ) {
      alert("Please fill in all required address fields.");
      return;
    }

    const cleanPhone = address.phone.replace(/\D/g, "");
    const cleanPincode = address.pincode.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (cleanPincode.length !== 6) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    setIsSubmitting(true);

    const finalAddress = {
      ...address,
      phone: cleanPhone,
      pincode: cleanPincode,
    };

    const orderData = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      items: cartItems,
      address: finalAddress,
      paymentMethod,
      subtotal,
      deliveryCharge,
      total,
      status: "Processing",
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("rstore-last-order", JSON.stringify(orderData));

      const existingOrders = JSON.parse(
        localStorage.getItem("rstore-orders") || "[]"
      );
      const orders = Array.isArray(existingOrders) ? existingOrders : [];
      localStorage.setItem(
        "rstore-orders",
        JSON.stringify([orderData, ...orders])
      );

      // Save address if new
      if (useNewAddress) {
        const existingAddresses = JSON.parse(
          localStorage.getItem("rstore-addresses") || "[]"
        );
        const addresses = Array.isArray(existingAddresses) ? existingAddresses : [];
        const newAddr = {
          ...finalAddress,
          type: "Home",
          id: Date.now(),
          isDefault: addresses.length === 0,
        };
        localStorage.setItem(
          "rstore-addresses",
          JSON.stringify([...addresses, newAddr])
        );
      }

      if (typeof clearCart === "function") {
        clearCart();
      }

      router.push("/order-success");
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#f6f8fc] px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
            🛒
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-900">Your cart is empty</h2>
          <p className="mt-2 text-xs text-slate-500">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white transition hover:bg-blue-500"
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-blue-600">Cart</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Secure Checkout</span>
        </div>

        {/* Page Title */}
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              RStore Express Checkout
            </span>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Complete Your Order
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Lock size={14} />
            <span>256-bit Encrypted Checkout</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Address & Payment */}
          <div className="space-y-6 lg:col-span-7 xl:col-span-8">
            {/* Step 1: Delivery Address */}
            <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">
                  1
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Delivery Address
                  </h2>
                  <p className="text-xs text-slate-400">
                    Where should we send your order?
                  </p>
                </div>
              </div>

              {/* Saved Addresses List */}
              {savedAddresses.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select a Saved Address:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {savedAddresses.map((saved) => (
                      <div
                        key={saved.id}
                        onClick={() => selectSavedAddress(saved)}
                        className={`cursor-pointer rounded-2xl border p-4 transition ${
                          selectedAddressId === saved.id
                            ? "border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-600"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                            {saved.type || "Home"}
                          </span>
                          {selectedAddressId === saved.id && (
                            <CheckCircle2 size={16} className="text-blue-600" />
                          )}
                        </div>
                        <p className="mt-2 text-xs font-bold text-slate-900">{saved.name}</p>
                        <p className="mt-1 text-[11px] leading-4 text-slate-500">
                          {saved.address}, {saved.city}, {saved.state} - {saved.pincode}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">Phone: {saved.phone}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUseNewAddress(true);
                      setSelectedAddressId(null);
                    }}
                    className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                  >
                    + Add a new delivery address
                  </button>
                </div>
              )}

              {/* Address Form */}
              {(useNewAddress || savedAddresses.length === 0) && (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={address.name}
                        onChange={handleAddressChange}
                        placeholder="John Doe"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Phone Number (10 digits) *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        value={address.phone}
                        onChange={handleAddressChange}
                        placeholder="9876543210"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength={6}
                        value={address.pincode}
                        onChange={handleAddressChange}
                        placeholder="110001"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">City / District *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={address.city}
                        onChange={handleAddressChange}
                        placeholder="New Delhi"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">State *</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={address.state}
                        onChange={handleAddressChange}
                        placeholder="Delhi"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Landmark (Optional)</label>
                      <input
                        type="text"
                        name="landmark"
                        value={address.landmark}
                        onChange={handleAddressChange}
                        placeholder="Near Metro Station"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Street Address *</label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={address.address}
                      onChange={handleAddressChange}
                      placeholder="House / Flat No., Street, Area..."
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Step 2: Payment Method */}
            <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white">
                  2
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Payment Method
                  </h2>
                  <p className="text-xs text-slate-400">
                    Choose how you want to pay securely
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {/* UPI */}
                <label
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                    paymentMethod === "upi"
                      ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <QrCode size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Instant UPI Payment</p>
                      <p className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="h-4 w-4 text-blue-600"
                  />
                </label>

                {/* Card */}
                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                    paymentMethod === "card"
                      ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Credit / Debit Card</p>
                      <p className="text-[11px] text-slate-500">Visa, MasterCard, RuPay, Amex</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="h-4 w-4 text-blue-600"
                  />
                </label>

                {/* COD */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <Banknote size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-slate-500">Pay cash or UPI at your doorstep</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="h-4 w-4 text-blue-600"
                  />
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Order Review Sidebar */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 space-y-5 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <h3 className="text-base font-black text-slate-900">
                Order Review ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-slate-100 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-1">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
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

              {/* Price Details */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck size={13} />
                    Shipping
                  </span>
                  <span className="font-bold text-emerald-600">
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="border-t border-dashed border-slate-200 pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-slate-900">Total Payable</span>
                    <span className="text-2xl font-black text-slate-900">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlePlaceOrder}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 active:scale-95 disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Processing Order..."
                ) : (
                  <>
                    Confirm & Place Order
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck size={15} className="text-emerald-600" />
                <span>100% Buyer Protection Guaranteed</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}