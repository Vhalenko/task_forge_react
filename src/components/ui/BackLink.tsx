import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-sm text-neutral-500 transition hover:text-neutral-900">
      ← {children}
    </Link>
  );
}
