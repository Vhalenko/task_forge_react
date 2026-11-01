import { useState, type FormEvent } from "react";
import { parseApiError } from "../../utils/apiError";
import Button from "../ui/Button";

interface NameFormProps {
  label: string;
  placeholder: string;
  submitLabel: string;
  onSubmit: (name: string) => Promise<void>;
}

export default function NameForm({ label, placeholder, submitLabel, onSubmit }: NameFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Name is required");
      return;
    }
    if (trimmed.length > 100) {
      setError("Name must be at most 100 characters");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await onSubmit(trimmed);
      setName("");
    } catch (err) {
      const { message, fieldErrors } = parseApiError(err);
      setError(fieldErrors.name ?? message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-3">
        <input
          aria-label={label}
          placeholder={placeholder}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          className={`block min-w-0 flex-1 rounded-md border bg-white px-3 py-2 text-sm text-neutral-900 outline-hidden transition placeholder:text-neutral-400 focus:ring-1 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900"
          }`}
        />
        <Button type="submit" loading={submitting} fullWidth={false} className="shrink-0">
          {submitLabel}
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </form>
  );
}
