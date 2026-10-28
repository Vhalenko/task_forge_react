import type { ComponentPropsWithoutRef } from "react";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  label: string;
}

export default function Select({ label, className = "", children, ...props }: SelectProps) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        className={`block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-hidden transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
