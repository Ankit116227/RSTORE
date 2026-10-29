
"use client";

import Link from "next/link";
import { useState } from "react";

import AuthShell from "@/components/auth/AuthShell";
import AuthInput from "@/components/auth/AuthInput";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedUser = localStorage.getItem("rstore-user");

    if (!savedUser) {
      setMessage(
        "We couldn't find an account with this email."
      );
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      email.toLowerCase() !==
      user.email.toLowerCase()
    ) {
      setMessage(
        "We couldn't find an account with this email."
      );
      return;
    }

    localStorage.setItem(
      "rstore-reset-email",
      email
    );

    setMessage(
      "Email verified. You can now reset your password."
    );
  };

  return (
    <AuthShell
      mode="login"
      title="Forgot your password?"
      subtitle="Enter your registered email address and we'll help you get back into your account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <AuthInput
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setMessage("");
          }}
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
          Verify Email
          <span className="ml-2">→</span>
        </button>

        {message.includes("reset") && (
          <Link
            href="/reset-password"
            className="flex h-14 items-center justify-center rounded-2xl border-2 border-[#D4AF37] text-sm font-black text-[#3E4E22] transition hover:bg-[#F4E4A6]"
          >
            Continue to Reset Password
          </Link>
        )}
      </form>
    </AuthShell>
  );
}

