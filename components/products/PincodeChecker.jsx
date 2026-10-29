"use client";

import { useState } from "react";
import { Truck, CheckCircle2, MapPin } from "lucide-react";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    const clean = pincode.replace(/\D/g, "");
    if (clean.length === 6) {
      setStatus({
        valid: true,
        text: "Delivery by tomorrow, 11:00 AM • Free Express Shipping",
      });
    } else {
      setStatus({
        valid: false,
        text: "Please enter a valid 6-digit Indian PIN code",
      });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <MapPin size={15} className="text-blue-600" />
        <span>Check Delivery Availability</span>
      </div>

      <form onSubmit={handleCheck} className="mt-3 flex items-center gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
            if (status) setStatus(null);
          }}
          placeholder="Enter 6-digit PIN code (e.g. 110001)"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none transition focus:border-blue-500"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-[#0b1220] px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
        >
          Check
        </button>
      </form>

      {status && (
        <div
          className={`mt-2.5 flex items-center gap-1.5 text-xs font-semibold ${
            status.valid ? "text-emerald-700" : "text-red-500"
          }`}
        >
          {status.valid ? <CheckCircle2 size={14} className="shrink-0" /> : null}
          <span>{status.text}</span>
        </div>
      )}
    </div>
  );
}
