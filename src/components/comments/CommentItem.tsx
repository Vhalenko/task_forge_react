import { useState } from "react";
import type { TaskComment } from "../../types/comment";
import { parseApiError } from "../../utils/apiError";
import { formatDateTime } from "../../utils/date";
import CommentForm from "./CommentForm";

interface CommentItemProps {
  comment: TaskComment;
  isOwn: boolean;
  onUpdate: (id: number, text: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function CommentItem({ comment, isOwn, onUpdate, onDelete }: CommentItemProps) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const author = isOwn ? "You" : (comment.createdByName ?? "Team member");

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      await onDelete(comment.id);
    } catch (err) {
      setDeleteError(parseApiError(err).message);
      setDeleting(false);
    }
  };

  return (
    <li className="py-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-neutral-900">{author}</p>
        <p className="shrink-0 text-xs text-neutral-500">{formatDateTime(comment.createdAt)}</p>
      </div>

      {editing ? (
        <div className="mt-2">
          <CommentForm
            initialValue={comment.text}
            submitLabel="Save"
            onSubmit={async (text) => {
              await onUpdate(comment.id, text);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        </div>
      ) : (
        <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-neutral-700">
          {comment.text}
        </p>
      )}

      {isOwn && !editing && (
        <div className="mt-2 flex items-center gap-4 text-xs">
          {confirmingDelete ? (
            <>
              <span className="text-neutral-500">Delete this comment?</span>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
                className="text-neutral-500 hover:text-neutral-900"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-neutral-500 hover:text-neutral-900"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="text-neutral-500 hover:text-neutral-900"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}

      {deleteError && <p className="mt-2 text-xs text-red-600">{deleteError}</p>}
    </li>
  );
}
