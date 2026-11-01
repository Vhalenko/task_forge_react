import { useState, type FormEvent } from "react";
import { parseApiError } from "../../utils/apiError";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

const MAX_LENGTH = 2000;

interface CommentFormProps {
  initialValue?: string;
  submitLabel: string;
  placeholder?: string;
  onSubmit: (text: string) => Promise<void>;
  onCancel?: () => void;
}

export default function CommentForm({
  initialValue = "",
  submitLabel,
  placeholder,
  onSubmit,
  onCancel,
}: CommentFormProps) {
  const [text, setText] = useState(initialValue);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError("Comment cannot be empty");
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Comment is too long (max ${MAX_LENGTH} characters)`);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await onSubmit(trimmed);
      setText(initialValue);
    } catch (err) {
      const { message, fieldErrors } = parseApiError(err);
      setError(fieldErrors.text ?? message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <textarea
        aria-label="Comment"
        rows={3}
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
        }}
        className="block w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-hidden transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
      />
      <Alert>{error}</Alert>
      <div className="flex items-center gap-4">
        <Button type="submit" loading={submitting} fullWidth={false}>
          {submitLabel}
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-neutral-500 hover:text-neutral-900"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
