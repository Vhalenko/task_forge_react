import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function LinkButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="shrink-0 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
    >
      {children}
    </Link>
  );
}
