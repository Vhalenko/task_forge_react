import { useState } from "react";
import { parseApiError } from "../../utils/apiError";

interface ConfirmActionProps {
  label: string;
  question: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
}

export default function ConfirmAction({
  label,
  question,
  confirmLabel = "Yes",
  onConfirm,
}: ConfirmActionProps) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setBusy(true);
    setError("");
    try {
      await onConfirm();
    } catch (err) {
      setError(parseApiError(err).message);
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-3 text-sm">
        {confirming ? (
          <>
            <span className="text-neutral-500">{question}</span>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={busy}
              className="font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              {busy ? "Please wait…" : confirmLabel}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={busy}
              className="text-neutral-500 hover:text-neutral-900"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="text-neutral-500 hover:text-neutral-900"
          >
            {label}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
