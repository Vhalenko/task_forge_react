import type { ComponentPropsWithoutRef } from "react";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  label: string;
  showLabel?: boolean;
  error?: string;
  wrapperClassName?: string;
}

export default function Select({
  label,
  showLabel = false,
  error,
  wrapperClassName = "",
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <label className={`block ${wrapperClassName}`}>
      <span className={showLabel ? "mb-1.5 block text-sm font-medium text-neutral-700" : "sr-only"}>
        {label}
      </span>
      <select
        aria-invalid={error ? true : undefined}
        className={`block w-full rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 outline-hidden transition focus:ring-1 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900"
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
