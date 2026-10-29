import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function AuthShell({
  children,
  title,
  subtitle,
  mode = "login",
}) {
  const isLogin = mode === "login";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid min-h-[620px] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-2">
        {/* Left Brand Panel */}
        <section className="relative hidden overflow-hidden bg-[#0b1220] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-md shadow-blue-500/30">
                R
              </span>
              <span className="text-xl font-black tracking-tight text-white">
                R<span className="text-blue-500">Store</span>
              </span>
            </Link>

            <div className="mt-20 max-w-sm">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold text-cyan-400">
                <Sparkles size={13} />
                <span>Next-Gen Tech Platform</span>
              </div>

              <h1 className="mt-4 text-3xl font-black leading-tight text-white xl:text-4xl">
                Technology.
                <br />
                <span className="text-blue-400">Simplified.</span>
              </h1>

              <p className="mt-4 text-xs leading-6 text-slate-400">
                Join thousands of tech enthusiasts shopping verified flagship smartphones, MacBooks, studio audio, and smart gear.
              </p>
            </div>
          </div>

          <div className="relative border-t border-white/10 pt-6">
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>100% Genuine electronics with manufacturer warranty</span>
            </div>
          </div>
        </section>

        {/* Right Form Panel */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link href="/" className="mb-8 inline-flex items-center gap-2.5 lg:hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1220] text-lg font-black text-white">
                R
              </span>
              <span className="text-xl font-black text-slate-900">
                R<span className="text-blue-600">Store</span>
              </span>
            </Link>

            <div className="mb-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {title}
              </h2>
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            </div>

            {children}

            <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-500">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-bold text-blue-600 hover:underline">
                    Create free account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="font-bold text-blue-600 hover:underline">
                    Sign in here
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
