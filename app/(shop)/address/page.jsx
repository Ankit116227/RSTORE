"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Plus, Trash2, Edit3, CheckCircle2, ArrowLeft } from "lucide-react";

const emptyForm = {
  type: "Home",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rstore-addresses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setAddresses(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  }, []);

  const saveToStorage = (newList) => {
    setAddresses(newList);
    localStorage.setItem("rstore-addresses", JSON.stringify(newList));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill all required fields");
      return;
    }

    if (editingId) {
      const updated = addresses.map((a) => (a.id === editingId ? { ...form, id: editingId } : a));
      saveToStorage(updated);
    } else {
      const newAddr = {
        ...form,
        id: Date.now(),
        isDefault: addresses.length === 0,
      };
      saveToStorage([...addresses, newAddr]);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to remove this address?")) {
      const filtered = addresses.filter((a) => a.id !== id);
      saveToStorage(filtered);
    }
  };

  const handleSetDefault = (id) => {
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    saveToStorage(updated);
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition mb-6"
        >
          <ArrowLeft size={14} />
          Back to Profile
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Address Book
            </span>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Saved Delivery Addresses
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Manage saved shipping locations for instant checkout.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              setShowForm(!showForm);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
          >
            <Plus size={16} />
            {showForm ? "Cancel" : "Add New Address"}
          </button>
        </div>

        {/* Address Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
              {editingId ? "Edit Address" : "Add New Address"}
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-slate-700">Address Label</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-500"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Office / Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full Name"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Mobile Number (10 digits) *</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="9876543210"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">PIN Code *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  placeholder="110001"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">City *</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="City"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">State *</label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="State"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Street Address *</label>
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Flat, Building, Street, Area..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-500"
              >
                Save Address
              </button>
            </div>
          </form>
        )}

        {/* Address Cards Grid */}
        {addresses.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`flex flex-col justify-between rounded-3xl border p-6 transition ${
                  addr.isDefault
                    ? "border-blue-500 bg-blue-50/20 shadow-sm ring-1 ring-blue-500/50"
                    : "border-slate-200/90 bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      {addr.type || "Home"}
                    </span>
                    {addr.isDefault && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600">
                        <CheckCircle2 size={14} /> Default
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-slate-900">{addr.name}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    Mobile: <span className="text-slate-700">{addr.phone}</span>
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold">
                  {!addr.isDefault ? (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-emerald-600">Default for Checkout</span>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(addr)}
                      className="text-slate-500 hover:text-blue-600"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(addr.id)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <MapPin size={28} />
            </div>
            <h3 className="mt-4 text-lg font-black text-slate-900">No saved addresses</h3>
            <p className="mt-1 text-xs text-slate-500">
              Add your delivery addresses to speed up checkout.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}