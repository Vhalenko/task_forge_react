import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import * as projectApi from "../api/projectApi";
import PageHeader from "../components/layout/PageHeader";
import TaskBrowser from "../components/tasks/TaskBrowser";
import BackLink from "../components/ui/BackLink";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LinkButton from "../components/ui/LinkButton";
import { useAsyncData } from "../hooks/useAsyncData";

function ProjectView({ projectId }: { projectId: number }) {
  const fetchProject = useCallback(() => projectApi.getProject(projectId), [projectId]);
  const fetchTasks = useCallback(() => projectApi.getProjectTasks(projectId), [projectId]);
  const projectState = useAsyncData(fetchProject);
  const tasksState = useAsyncData(fetchTasks);
  const tasks = useMemo(() => tasksState.data ?? [], [tasksState.data]);

  if (projectState.error) {
    return (
      <div>
        <div className="mb-6">
          <BackLink to="/projects">Projects</BackLink>
        </div>
        <ErrorState message={projectState.error} onRetry={projectState.reload} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <BackLink to="/projects">Projects</BackLink>
      </div>
      <PageHeader
        title={projectState.data?.name ?? "Project"}
        action={<LinkButton to={`/tasks/new?project=${projectId}`}>New task</LinkButton>}
      />
      <TaskBrowser
        tasks={tasks}
        loading={tasksState.loading}
        error={tasksState.error}
        onRetry={tasksState.reload}
        emptyTitle="No tasks in this project"
        emptyDescription="Create the first one with New task."
      />
    </div>
  );
}

export default function ProjectPage() {
  const { projectId } = useParams();
  const id = Number(projectId);

  if (!Number.isInteger(id) || id <= 0) {
    return (
      <EmptyState
        title="Project not found"
        description="This link does not point to a project."
        action={<BackLink to="/projects">Projects</BackLink>}
      />
    );
  }

  return <ProjectView key={id} projectId={id} />;
}
