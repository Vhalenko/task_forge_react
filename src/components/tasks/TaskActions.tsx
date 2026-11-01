import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as taskApi from "../../api/taskApi";
import { useAuth } from "../../hooks/useAuth";
import type { Task } from "../../types/task";
import { parseApiError } from "../../utils/apiError";
import { canManageTask } from "../../utils/permissions";

interface TaskActionsProps {
  task: Task;
  onTaskChange: (task: Task) => void;
}

export default function TaskActions({ task, onTaskChange }: TaskActionsProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assigning, setAssigning] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!user) return null;

  const isAssigned = task.assignees.some((assignee) => assignee.id === user.id);
  const canManage = canManageTask(task, user);

  const handleAssign = async () => {
    setAssigning(true);
    setError("");
    try {
      await taskApi.assignUser(task.id, user.id);
      onTaskChange(await taskApi.getTask(task.id));
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setAssigning(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await taskApi.deleteTask(task.id);
      navigate("/", { replace: true });
    } catch (err) {
      setError(parseApiError(err).message);
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        {!isAssigned && (
          <button
            type="button"
            onClick={handleAssign}
            disabled={assigning}
            className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 disabled:opacity-50"
          >
            {assigning ? "Assigning…" : "Assign to me"}
          </button>
        )}

        {canManage && !confirmingDelete && (
          <>
            <Link
              to={`/tasks/${task.id}/edit`}
              className="text-neutral-500 hover:text-neutral-900"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="text-neutral-500 hover:text-neutral-900"
            >
              Delete
            </button>
          </>
        )}

        {canManage && confirmingDelete && (
          <>
            <span className="text-neutral-500">Delete this task?</span>
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
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
