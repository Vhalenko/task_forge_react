import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-6 py-12 antialiased">
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/8 bg-ink-900/90 p-6 shadow-2xl shadow-black/30 sm:p-9">
        <p className="mb-10 flex items-center gap-2 text-lg font-semibold tracking-tight text-white"><span className="grid size-8 place-items-center rounded-lg bg-accent text-ink-950">✦</span>TaskForge</p>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-ink-400">{subtitle}</p>}
        <div className="mt-8">{children}</div>
        {footer && <p className="mt-8 text-sm text-ink-400">{footer}</p>}
      </div>
    </div>
  );
}
