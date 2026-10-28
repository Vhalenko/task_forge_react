import type { TaskPriority } from "../../types/task";
import { PRIORITY_LABELS } from "../../utils/taskMeta";

const DOT: Record<TaskPriority, string> = {
  LOW: "bg-neutral-300",
  MEDIUM: "bg-amber-400",
  HIGH: "bg-red-500",
};

export default function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[priority]}`} />
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
