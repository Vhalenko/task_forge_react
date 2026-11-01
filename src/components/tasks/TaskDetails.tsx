import type { ReactNode } from "react";
import type { Task } from "../../types/task";
import { formatDate, isOverdue } from "../../utils/date";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</dt>
      <dd className="mt-1 text-sm text-neutral-900">{children}</dd>
    </div>
  );
}

export default function TaskDetails({ task, actions }: { task: Task; actions?: ReactNode }) {
  const overdue = isOverdue(task);

  return (
    <article>
      <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
              </div>
              {actions}
            </div>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">{task.title}</h1>

      {task.description ? (
        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-neutral-700">
          {task.description}
        </p>
      ) : (
        <p className="mt-4 text-sm text-neutral-400">No description.</p>
      )}

      <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-neutral-200 pt-6 sm:grid-cols-2">
        <Fact label="Project">{task.projectName}</Fact>
        <Fact label="Due date">
          <span className={overdue ? "font-medium text-red-600" : undefined}>
            {task.dueDate ? formatDate(task.dueDate) : "No due date"}
          </span>
        </Fact>
        <Fact label="Created">{formatDate(task.createdAt)}</Fact>
        {task.completedAt && <Fact label="Completed">{formatDate(task.completedAt)}</Fact>}
        {task.createdByName && <Fact label="Created by">{task.createdByName}</Fact>}
        <Fact label="Assignees">
          {task.assignees.length === 0 ? (
            <span className="text-neutral-400">Unassigned</span>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {task.assignees.map((assignee) => (
                <li
                  key={assignee.id}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
                >
                  {assignee.firstName} {assignee.lastName}
                </li>
              ))}
            </ul>
          )}
        </Fact>
      </dl>
    </article>
  );
}
