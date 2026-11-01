import type { ReactNode } from "react";

interface AlertProps {
  variant?: "error" | "success";
  children?: ReactNode;
}

const STYLES = {
  error: "border-red-400/20 bg-red-400/10 text-red-200",
  success: "border-accent/20 bg-accent/10 text-accent",
} as const;

export default function Alert({ variant = "error", children }: AlertProps) {
  if (!children) return null;
  return (
    <div role="alert" className={`rounded-md border px-3 py-2 text-sm ${STYLES[variant]}`}>
      {children}
    </div>
  );
}
