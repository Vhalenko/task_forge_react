import { Link } from "react-router-dom";
import * as teamApi from "../../api/teamApi";
import NameForm from "../../components/admin/NameForm";
import PageHeader from "../../components/layout/PageHeader";
import ConfirmAction from "../../components/ui/ConfirmAction";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";
import Spinner from "../../components/ui/Spinner";
import { useAsyncData } from "../../hooks/useAsyncData";

export default function AdminTeamsPage() {
  const { data: teams, setData, loading, error, reload } = useAsyncData(teamApi.getTeams);

  const handleCreate = async (name: string) => {
    const created = await teamApi.createTeam({ name });
    setData((prev) => [...(prev ?? []), created]);
  };

  const handleDelete = async (id: number) => {
    await teamApi.deleteTeam(id);
    setData((prev) => (prev ?? []).filter((team) => team.id !== id));
  };

  function renderContent() {
    if (loading) return <Spinner />;
    if (error) return <ErrorState message={error} onRetry={reload} />;

    const list = teams ?? [];
    if (list.length === 0) {
      return <EmptyState title="No teams yet" description="Create the first team above." />;
    }

    return (
      <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
        {list.map((team) => (
          <li key={team.id} className="flex items-center justify-between gap-4 py-4">
            <Link
              to={`/admin/teams/${team.id}`}
              className="min-w-0 truncate text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
            >
              {team.name}
            </Link>
            <ConfirmAction
              label="Delete"
              question="Delete this team?"
              confirmLabel="Yes, delete"
              onConfirm={() => handleDelete(team.id)}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <PageHeader title="Teams" subtitle="Create teams and manage their members and projects." />
      <div className="mb-8 max-w-md">
        <NameForm
          label="Team name"
          placeholder="New team name"
          submitLabel="Create team"
          onSubmit={handleCreate}
        />
      </div>
      {renderContent()}
    </div>
  );
}
