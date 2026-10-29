import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkText = "View All",
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            {eyebrow}
          </span>
        )}

        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:flex"
        >
          {linkText}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}