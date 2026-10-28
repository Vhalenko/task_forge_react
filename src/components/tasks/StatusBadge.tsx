import type { TaskStatus } from "../../types/task";
import { STATUS_LABELS } from "../../utils/taskMeta";

const STYLES: Record<TaskStatus, string> = {
  TODO: "bg-neutral-100 text-neutral-700",
  IN_PROGRESS: "bg-blue-50 text-blue-700",
  DONE: "bg-green-50 text-green-700",
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
