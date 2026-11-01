import { useMemo, useState } from "react";
import type { Task } from "../../types/task";
import {
  applyTaskFilters,
  DEFAULT_FILTERS,
  hasActiveFilters,
  type TaskFilters,
} from "../../utils/taskFilters";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import Spinner from "../ui/Spinner";
import TaskList from "./TaskList";
import TaskToolbar from "./TaskToolbar";

interface TaskBrowserProps {
  tasks: Task[];
  loading: boolean;
  error: string;
  onRetry: () => void;
  emptyTitle: string;
  emptyDescription: string;
}

export default function TaskBrowser({
  tasks,
  loading,
  error,
  onRetry,
  emptyTitle,
  emptyDescription,
}: TaskBrowserProps) {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const visible = useMemo(() => applyTaskFilters(tasks, filters), [tasks, filters]);

  function renderContent() {
    if (loading) return <Spinner />;
    if (error) return <ErrorState message={error} onRetry={onRetry} />;

    if (tasks.length === 0) {
      return <EmptyState title={emptyTitle} description={emptyDescription} />;
    }

    if (visible.length === 0) {
      return (
        <EmptyState
          title="No matching tasks"
          description="Try a different search or clear the filters."
          action={
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="text-sm font-medium text-neutral-900 underline underline-offset-4"
            >
              Clear filters
            </button>
          }
        />
      );
    }

    return <TaskList tasks={visible} />;
  }

  return (
    <div>
      <TaskToolbar filters={filters} onChange={setFilters} />

      {!loading && !error && tasks.length > 0 && (
        <p className="mt-4 text-sm text-neutral-500">
          {hasActiveFilters(filters)
            ? `${visible.length} of ${tasks.length} tasks`
            : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
        </p>
      )}

      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
