import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 antialiased">
      <div className="w-full max-w-sm">
        <p className="mb-10 text-sm font-semibold tracking-tight text-neutral-900">TaskForge</p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>}
        <div className="mt-8">{children}</div>
        {footer && <p className="mt-8 text-sm text-neutral-500">{footer}</p>}
      </div>
    </div>
  );
}
