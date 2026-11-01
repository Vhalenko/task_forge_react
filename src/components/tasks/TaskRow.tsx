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
        className="-mx-3 flex flex-col gap-3 rounded-md px-3 py-4 transition hover:bg-neutral-50 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <div className="min-w-0">
          <p
            className={`truncate text-sm font-medium ${
              task.status === "DONE" ? "text-neutral-400 line-through" : "text-neutral-900"
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="mt-0.5 truncate text-sm text-neutral-500">{task.description}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <PriorityBadge priority={task.priority} />
          <StatusBadge status={task.status} />
          <span
            className={`w-24 text-right text-xs ${
              overdue ? "font-medium text-red-600" : "text-neutral-500"
            }`}
          >
            {task.dueDate ? formatDate(task.dueDate) : "No due date"}
          </span>
        </div>
      </Link>
    </li>
  );
}
