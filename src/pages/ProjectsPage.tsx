import { useCallback } from "react";
import { Link } from "react-router-dom";
import * as teamApi from "../api/teamApi";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import Spinner from "../components/ui/Spinner";
import { useAsyncData } from "../hooks/useAsyncData";
import { useAuth } from "../hooks/useAuth";

function ProjectsView({ teamId, teamName }: { teamId: number; teamName: string | null }) {
  const fetchProjects = useCallback(() => teamApi.getTeamProjects(teamId), [teamId]);
  const { data: projects, loading, error, reload } = useAsyncData(fetchProjects);

  function renderContent() {
    if (loading) return <Spinner />;
    if (error) return <ErrorState message={error} onRetry={reload} />;

    if (!projects || projects.length === 0) {
      return (
        <EmptyState
          title="No projects yet"
          description="An admin can create projects for your team."
        />
      );
    }

      return (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              to={`/projects/${project.id}`}
              className="block rounded-2xl border border-white/8 bg-ink-900 p-5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-accent/40"
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <PageHeader title="Projects" subtitle={teamName ?? undefined} />
      {renderContent()}
    </div>
  );
}

export default function ProjectsPage() {
  const { user } = useAuth();

  if (!user?.teamId) {
    return (
      <EmptyState
        title="Join a team first"
        description="Projects belong to a team. Ask an admin to add you."
      />
    );
  }

  return <ProjectsView teamId={user.teamId} teamName={user.teamName} />;
}
