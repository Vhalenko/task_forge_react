import type { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  loading = false,
  disabled = false,
  fullWidth = true,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={`rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}
