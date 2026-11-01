import type { ComponentPropsWithoutRef } from "react";

interface TextFieldProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label: string;
  error?: string;
}

export default function TextField({ id, label, error, className = "", ...props }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-300">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`block w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-white outline-hidden transition placeholder:text-ink-400 focus:ring-1 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "focus:border-accent focus:ring-accent"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
