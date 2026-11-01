import { useCallback } from "react";
import * as commentApi from "../../api/commentApi";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useAuth } from "../../hooks/useAuth";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function CommentSection({ taskId }: { taskId: number }) {
  const { user } = useAuth();
  const fetchComments = useCallback(() => commentApi.getTaskComments(taskId), [taskId]);
  const { data: comments, setData, loading, error, reload } = useAsyncData(fetchComments);

  const handleCreate = async (text: string) => {
    const created = await commentApi.createComment(taskId, { text });
    setData((prev) => [...(prev ?? []), created]);
  };

  const handleUpdate = async (id: number, text: string) => {
    const updated = await commentApi.updateComment(id, { text });
    setData((prev) => (prev ?? []).map((c) => (c.id === id ? updated : c)));
  };

  const handleDelete = async (id: number) => {
    await commentApi.deleteComment(id);
    setData((prev) => (prev ?? []).filter((c) => c.id !== id));
  };

  function renderBody() {
    if (loading) return <Spinner />;

    if (error) {
      return (
        <div className="mt-4 space-y-4">
          <Alert>{error}</Alert>
          <button
            type="button"
            onClick={reload}
            className="text-sm font-medium text-neutral-900 underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      );
    }

    const list = comments ?? [];

    return (
      <>
        {list.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-500">No comments yet.</p>
        ) : (
          <ul className="mt-2 divide-y divide-neutral-200">
            {list.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                isOwn={comment.createdById === user?.id}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}

        <div className="mt-6 border-t border-neutral-200 pt-6">
          <CommentForm
            submitLabel="Comment"
            placeholder="Write a comment…"
            onSubmit={handleCreate}
          />
        </div>
      </>
    );
  }

  return (
    <section aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="text-lg font-semibold tracking-tight text-neutral-900">
        Comments{comments && comments.length > 0 ? ` (${comments.length})` : ""}
      </h2>
      {renderBody()}
    </section>
  );
}
