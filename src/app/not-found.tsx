import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { GoBackButton } from "./not-found-back";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">PropWise</span>
        </div>

        <div className="relative mb-6 select-none">
          <span
            className="text-[120px] font-bold leading-none tracking-tighter text-gray-100 dark:text-gray-800"
            style={{ fontFamily: "var(--font-figtree)" }}
          >
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[120px] font-bold leading-none tracking-tighter text-brand-600/10 dark:text-brand-400/10 blur-sm pointer-events-none">
            404
          </span>
        </div>

        <h1
          className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
          style={{ fontFamily: "var(--font-figtree)" }}
        >
          Page not found
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <GoBackButton>
            <ArrowLeft className="w-4 h-4" />
            Go back
          </GoBackButton>
        </div>
      </div>
    </div>
  );
}
