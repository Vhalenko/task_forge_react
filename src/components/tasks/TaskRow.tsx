import { Link } from "react-router-dom";
import type { Task } from "../../types/task";
import { formatDate, isOverdue } from "../../utils/date";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TaskRow({ task }: { task: Task }) {
  const overdue = isOverdue(task);

  return (
    <li>
      <Link
        to={`/tasks/${task.id}`}
        className="flex flex-col gap-3 rounded-xl border border-white/8 bg-ink-900 px-4 py-4 transition hover:border-accent/30 hover:bg-ink-800 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <div className="min-w-0">
          <p
            className={`truncate text-sm font-medium ${
              task.status === "DONE" ? "text-ink-400 line-through" : "text-white"
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="mt-0.5 truncate text-sm text-ink-400">{task.description}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
          <span
            className={`w-24 text-right text-xs ${
              overdue ? "font-medium text-rose-300" : "text-ink-400"
            }`}
          >
            {task.dueDate ? formatDate(task.dueDate) : "No due date"}
          </span>
        </div>
      </Link>
    </li>
  );
}
