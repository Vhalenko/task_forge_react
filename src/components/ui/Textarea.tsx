import type { ComponentPropsWithoutRef } from "react";

interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  id: string;
  label: string;
  error?: string;
}

export default function Textarea({ id, label, error, className = "", ...props }: TextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`block w-full resize-y rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 outline-hidden transition placeholder:text-neutral-400 focus:ring-1 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900"
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
