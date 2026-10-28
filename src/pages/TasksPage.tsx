import { useMemo, useState } from "react";
import { useMyTasks } from "../hooks/useMyTasks";
import {
  applyTaskFilters,
  DEFAULT_FILTERS,
  hasActiveFilters,
  type TaskFilters,
} from "../utils/taskFilters";
import TaskToolbar from "../components/tasks/TaskToolbar";
import TaskList from "../components/tasks/TaskList";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";

export default function TasksPage() {
  const { tasks, loading, error, reload } = useMyTasks();
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);

  const visible = useMemo(() => applyTaskFilters(tasks, filters), [tasks, filters]);

  function renderContent() {
    if (loading) return <Spinner />;

    if (error) {
      return (
        <div className="space-y-4">
          <Alert>{error}</Alert>
          <button
            onClick={reload}
            className="text-sm font-medium text-neutral-900 underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      );
    }

    if (tasks.length === 0) {
      return (
        <EmptyState
          title="No tasks yet"
          description="Tasks assigned to you will show up here."
        />
      );
    }

    if (visible.length === 0) {
      return (
        <EmptyState
          title="No matching tasks"
          description="Try a different search or clear the filters."
          action={
            <button
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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">My tasks</h1>
        {!loading && !error && tasks.length > 0 && (
          <p className="mt-1 text-sm text-neutral-500">
            {hasActiveFilters(filters)
              ? `${visible.length} of ${tasks.length} tasks`
              : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
          </p>
        )}
      </div>

      <TaskToolbar filters={filters} onChange={setFilters} />

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
}
