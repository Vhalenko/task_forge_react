import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function LinkButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="shrink-0 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-strong"
    >
      {children}
    </Link>
  );
}
