
"use client";

import Link from "next/link";
import { useState } from "react";

import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedUser = localStorage.getItem("rstore-user");

    if (!savedUser) {
      setMessage(
        "No account found. Please create an account first."
      );
      return;
    }

    if (form.password.length < 6) {
      setMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const user = JSON.parse(savedUser);

    localStorage.setItem(
      "rstore-user",
      JSON.stringify({
        ...user,
        password: form.password,
      })
    );

    localStorage.removeItem("rstore-reset-email");

    setMessage(
      "Password updated successfully."
    );
  };

  return (
    <AuthShell
      mode="login"
      title="Create a new password"
      subtitle="Choose a strong password that you'll remember."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <AuthInput
          label="New password"
          name="password"
          type="password"
          placeholder="Enter new password"
          value={form.password}
          onChange={handleChange}
        />

        <AuthInput
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat new password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {message && (
          <div className="rounded-2xl border border-[#E5E1D6] bg-[#F8F6F0] px-4 py-3 text-sm font-semibold text-[#3E4E22]">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="h-14 w-full rounded-2xl bg-[#3E4E22] text-sm font-black text-white transition hover:bg-[#556B2F]"
        >
          Update Password
          <span className="ml-2">→</span>
        </button>

        {message.includes("successfully") && (
          <Link
            href="/login"
            className="flex h-14 items-center justify-center rounded-2xl border-2 border-[#D4AF37] text-sm font-black text-[#3E4E22] transition hover:bg-[#F4E4A6]"
          >
            Continue to Login
          </Link>
        )}
      </form>
    </AuthShell>
  );
}

