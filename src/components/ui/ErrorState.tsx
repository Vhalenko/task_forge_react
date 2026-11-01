import Alert from "./Alert";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="space-y-4">
      <Alert>{message}</Alert>
      <button
        type="button"
        onClick={onRetry}
        className="text-sm font-medium text-neutral-900 underline underline-offset-4"
      >
        Try again
      </button>
    </div>
  );
}
