import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import * as projectApi from "../../api/projectApi";
import * as teamApi from "../../api/teamApi";
import MemberRow from "../../components/admin/MemberRow";
import NameForm from "../../components/admin/NameForm";
import PageHeader from "../../components/layout/PageHeader";
import BackLink from "../../components/ui/BackLink";
import ConfirmAction from "../../components/ui/ConfirmAction";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import Spinner from "../../components/ui/Spinner";
import { useAsyncData } from "../../hooks/useAsyncData";
import { useAuth } from "../../hooks/useAuth";
import type { User } from "../../types/auth";

function AdminTeamView({ teamId }: { teamId: number }) {
  const { user: me } = useAuth();

  const fetchTeam = useCallback(() => teamApi.getTeam(teamId), [teamId]);
  const fetchUsers = useCallback(() => teamApi.getTeamUsers(teamId), [teamId]);
  const fetchProjects = useCallback(() => teamApi.getTeamProjects(teamId), [teamId]);
  const teamState = useAsyncData(fetchTeam);
  const usersState = useAsyncData(fetchUsers);
  const projectsState = useAsyncData(fetchProjects);

  const replaceMember = (updated: User) =>
    usersState.setData((prev) =>
      (prev ?? []).map((member) => (member.id === updated.id ? updated : member))
    );

  const handleCreateProject = async (name: string) => {
    const created = await teamApi.createProject(teamId, { name });
    projectsState.setData((prev) => [...(prev ?? []), created]);
  };

  const handleDeleteProject = async (id: number) => {
    await projectApi.deleteProject(id);
    projectsState.setData((prev) => (prev ?? []).filter((project) => project.id !== id));
  };

  function renderMembers() {
    if (usersState.loading) return <Spinner />;
    if (usersState.error) {
      return <ErrorState message={usersState.error} onRetry={usersState.reload} />;
    }

    const members = usersState.data ?? [];
    if (members.length === 0) {
      return <EmptyState title="No members yet" description="This team has no members." />;
    }

    return (
      <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            isSelf={member.id === me?.id}
            onChange={replaceMember}
          />
        ))}
      </ul>
    );
  }

  function renderProjects() {
    if (projectsState.loading) return <Spinner />;
    if (projectsState.error) {
      return <ErrorState message={projectsState.error} onRetry={projectsState.reload} />;
    }

    const projects = projectsState.data ?? [];
    if (projects.length === 0) {
      return <EmptyState title="No projects yet" description="Add the first project above." />;
    }

    return (
      <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center justify-between gap-4 py-4">
            <Link
              to={`/projects/${project.id}`}
              className="min-w-0 truncate text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
            >
              {project.name}
            </Link>
            <ConfirmAction
              label="Delete"
              question="Delete this project?"
              confirmLabel="Yes, delete"
              onConfirm={() => handleDeleteProject(project.id)}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (teamState.error) {
    return (
      <div>
        <div className="mb-6">
          <BackLink to="/admin/teams">Teams</BackLink>
        </div>
        <ErrorState message={teamState.error} onRetry={teamState.reload} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <BackLink to="/admin/teams">Teams</BackLink>
      </div>
      <PageHeader title={teamState.data?.name ?? "Team"} />

      <section>
        <h2 className="mb-2 text-lg font-semibold tracking-tight text-neutral-900">Members</h2>
        {renderMembers()}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">Projects</h2>
        <div className="mb-4 max-w-md">
          <NameForm
            label="Project name"
            placeholder="New project name"
            submitLabel="Add project"
            onSubmit={handleCreateProject}
          />
        </div>
        {renderProjects()}
      </section>
    </div>
  );
}

export default function AdminTeamPage() {
  const { teamId } = useParams();
  const id = Number(teamId);

  if (!Number.isInteger(id) || id <= 0) {
    return (
      <EmptyState
        title="Team not found"
        description="This link does not point to a team."
        action={<BackLink to="/admin/teams">Teams</BackLink>}
      />
    );
  }

  return <AdminTeamView key={id} teamId={id} />;
}
