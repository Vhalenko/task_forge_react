import type { Task } from "../types/task";

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function isOverdue(task: Pick<Task, "dueDate" | "status">): boolean {
  if (!task.dueDate || task.status === "DONE") return false;
  return Date.parse(task.dueDate) < Date.now();
}
