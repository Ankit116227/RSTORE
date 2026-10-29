"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Verifying credentials...");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          Password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      const user = data.user;
      const authData = {
        isLoggedIn: true,
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: user.profileImage || "",
        loginAt: new Date().toISOString(),
      };

      localStorage.setItem("rstore-auth", JSON.stringify(authData));
      window.dispatchEvent(new Event("rstore-auth-changed"));

      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/profile");
      }, 500);
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setMessage("Unable to connect to server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AuthShell
      mode="login"
      title="Welcome Back"
      subtitle="Sign in to manage your orders, wishlist, and profile."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="font-bold text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {message && (
          <div
            className={`rounded-xl p-3 text-xs font-semibold ${
              message.includes("successful")
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In to RStore"}
          {!loading && <ArrowRight size={15} />}
        </button>
      </form>
    </AuthShell>
  );
}