import { useCallback } from "react";
import { useParams } from "react-router-dom";
import * as taskApi from "../api/taskApi";
import CommentSection from "../components/comments/CommentSection";
import TaskActions from "../components/tasks/TaskActions";
import TaskDetails from "../components/tasks/TaskDetails";
import Alert from "../components/ui/Alert";
import BackLink from "../components/ui/BackLink";
import EmptyState from "../components/ui/EmptyState";
import Spinner from "../components/ui/Spinner";
import { useAsyncData } from "../hooks/useAsyncData";

function TaskDetailsView({ taskId }: { taskId: number }) {
  const fetchTask = useCallback(() => taskApi.getTask(taskId), [taskId]);
  const { data: task, setData, loading, error, reload } = useAsyncData(fetchTask);

  function renderContent() {
    if (loading) return <Spinner />;

    if (error || !task) {
      return (
        <div className="space-y-4">
          <Alert>{error || "Task not found."}</Alert>
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

    return (
      <>
        <TaskDetails
          task={task}
          actions={<TaskActions task={task} onTaskChange={setData} />}
        />
        <div className="mt-12">
          <CommentSection taskId={task.id} />
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <BackLink to="/">My tasks</BackLink>
      </div>
      {renderContent()}
    </div>
  );
}

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const id = Number(taskId);

  if (!Number.isInteger(id) || id <= 0) {
    return (
      <EmptyState
        title="Task not found"
        description="This link does not point to a task."
        action={<BackLink to="/">My tasks</BackLink>}
      />
    );
  }

  return <TaskDetailsView key={id} taskId={id} />;
}
