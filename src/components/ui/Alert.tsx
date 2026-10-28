import type { ReactNode } from "react";

interface AlertProps {
  variant?: "error" | "success";
  children?: ReactNode;
}

const STYLES = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-green-200 bg-green-50 text-green-700",
} as const;

export default function Alert({ variant = "error", children }: AlertProps) {
  if (!children) return null;
  return (
    <div role="alert" className={`rounded-md border px-3 py-2 text-sm ${STYLES[variant]}`}>
      {children}
    </div>
  );
}
