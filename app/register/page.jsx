
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if (!name) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!phone) {
      setMessage("Please enter your phone number.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("Creating your account...");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const responseText = await response.text();

      let data = {};

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Registration API returned invalid JSON:",
            responseText
          );

          setMessage(
            `Server returned an invalid response (HTTP ${response.status}). Please check the server terminal.`
          );

          return;
        }
      }

      if (!response.ok) {
        console.error("Registration API error:", response.status, data);

        setMessage(
          data.message ||
            `Registration failed (HTTP ${response.status}).`
        );

        return;
      }

      if (!responseText.trim()) {
        console.error("Registration API returned an empty response.");

        setMessage(
          "The server returned an empty response. Please check the registration API."
        );

        return;
      }

      localStorage.removeItem("rstore-user");
      localStorage.removeItem("rstore-auth");

      setMessage(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration request failed:", error);

      setMessage(
        "Unable to contact the server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      mode="register"
      title="Create your account"
      subtitle="Join RStore and get a smarter way to shop for electronics."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Full name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
        />

        <AuthInput
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <AuthInput
          label="Phone number"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={form.phone}
          onChange={handleChange}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={form.password}
          onChange={handleChange}
        />

        <AuthInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {message && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl p-3 text-xs font-semibold ${
              message.includes("successfully")
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : message === "Creating your account..."
                  ? "border border-blue-200 bg-blue-50 text-blue-700"
                  : "border border-red-200 bg-red-50 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate-500">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          <span>
            I agree to the RStore{" "}
            <Link
              href="/"
              className="font-bold text-blue-600 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and Privacy Policy.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Free Account"}
          {!loading && <span className="ml-1">→</span>}
        </button>
      </form>
    </AuthShell>
  );
}

