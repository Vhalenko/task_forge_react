import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as projectApi from "../api/projectApi";
import PageHeader from "../components/layout/PageHeader";
import BackLink from "../components/ui/BackLink";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LinkButton from "../components/ui/LinkButton";
import { useAsyncData } from "../hooks/useAsyncData";
import type { TaskStatus } from "../types/task";
import { STATUS_LABELS } from "../utils/taskMeta";
import * as taskApi from "../api/taskApi";

function ProjectView({ projectId }: { projectId: number }) {
  const fetchProject = useCallback(() => projectApi.getProject(projectId), [projectId]);
  const fetchTasks = useCallback(() => projectApi.getProjectTasks(projectId), [projectId]);
  const projectState = useAsyncData(fetchProject);
  const tasksState = useAsyncData(fetchTasks);
  const tasks = useMemo(() => tasksState.data ?? [], [tasksState.data]);
  const [dragged, setDragged] = useState<number | null>(null);
  const [customColumns, setCustomColumns] = useState<string[]>(() => JSON.parse(localStorage.getItem(`taskforge-columns-${projectId}`) ?? "[]"));
  const [newColumn, setNewColumn] = useState("");
  const columns: Array<{ id: string; label: string; status?: TaskStatus }> = [{ id: "TODO", label: STATUS_LABELS.TODO, status: "TODO" }, { id: "IN_PROGRESS", label: STATUS_LABELS.IN_PROGRESS, status: "IN_PROGRESS" }, { id: "DONE", label: STATUS_LABELS.DONE, status: "DONE" }, ...customColumns.map((label) => ({ id: label, label }))];
  const moveTask = async (status: TaskStatus) => {
    if (dragged === null) return;
    const task = tasks.find((item) => item.id === dragged);
    if (!task || task.status === status) return;
    tasksState.setData((prev) => (prev ?? []).map((item) => item.id === task.id ? { ...item, status } : item));
    try { await taskApi.updateTask(task.id, { title: task.title, description: task.description ?? "", priority: task.priority, status, dueDate: task.dueDate }); }
    catch { tasksState.reload(); }
    setDragged(null);
  };

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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-ink-400">Drag tasks between columns to update their status.</p><form onSubmit={(event) => { event.preventDefault(); const label = newColumn.trim(); if (!label || customColumns.includes(label)) return; const next = [...customColumns, label]; setCustomColumns(next); localStorage.setItem(`taskforge-columns-${projectId}`, JSON.stringify(next)); setNewColumn(""); }} className="flex gap-2"><input value={newColumn} onChange={(event) => setNewColumn(event.target.value)} placeholder="Custom column" className="w-36 rounded-lg border border-white/10 bg-ink-900 px-3 py-2 text-xs text-white outline-none placeholder:text-ink-400 focus:border-accent" /><button className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-ink-300 hover:border-accent hover:text-accent">+ Add column</button></form></div>
      {tasksState.loading ? <div className="text-sm text-ink-400">Loading board…</div> : tasksState.error ? <ErrorState message={tasksState.error} onRetry={tasksState.reload} /> : <div className="grid gap-4 xl:grid-cols-3">
        {columns.map((column) => { const columnTasks = column.status ? tasks.filter((task) => task.status === column.status) : []; return <section key={column.id} onDragOver={(event) => event.preventDefault()} onDrop={() => column.status && moveTask(column.status)} className="min-h-[420px] rounded-2xl border border-white/8 bg-ink-900/70 p-3">
          <div className="mb-3 flex items-center justify-between px-2"><h2 className="text-sm font-semibold text-white">{column.label}</h2><span className="rounded-full bg-white/8 px-2 py-0.5 text-xs text-ink-400">{columnTasks.length}</span></div>
          <div className="space-y-3">{columnTasks.map((task) => <Link key={task.id} to={`/tasks/${task.id}`} draggable onDragStart={() => setDragged(task.id)} className="block rounded-xl border border-white/8 bg-ink-800 p-4 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-accent/40"><div className="mb-3 flex items-start justify-between gap-3"><p className="text-sm font-medium leading-5 text-white">{task.title}</p><span className={`mt-1 size-2 shrink-0 rounded-full ${task.priority === "HIGH" ? "bg-rose-400" : task.priority === "MEDIUM" ? "bg-amber-300" : "bg-sky-300"}`} /></div>{task.description && <p className="mb-3 line-clamp-2 text-xs leading-5 text-ink-400">{task.description}</p>}<div className="flex items-center justify-between text-xs text-ink-400"><span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</span><span className="rounded-md bg-white/5 px-2 py-1 text-ink-300">{task.priority.toLowerCase()}</span></div></Link>)}</div>
          {columnTasks.length === 0 && <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-xs text-ink-400">{column.status ? "Drop tasks here" : "Custom workflow column"}</div>}
        </section>; })}
      </div>}
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
