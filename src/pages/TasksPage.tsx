
import { useMemo, useState } from 'react'
import { Link } from 'react-router'

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

type Task = {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Create authentication API',
    description: 'Implement registration and login endpoints.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2026-10-21',
  },
  {
    id: 2,
    title: 'Build dashboard UI',
    description: 'Create the main workspace overview.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-10-23',
  },
  {
    id: 3,
    title: 'Set up database',
    description: 'Configure PostgreSQL and task entities.',
    status: 'DONE',
    priority: 'HIGH',
    dueDate: '2026-10-17',
  },
  {
    id: 4,
    title: 'Write unit tests',
    description: 'Add tests for the task service.',
    status: 'TODO',
    priority: 'LOW',
    dueDate: '2026-10-25',
  },
]

const statusLabels: Record<TaskStatus, string> = {
  TODO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
}

const priorityLabels: Record<TaskPriority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
}

function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [isCreating, setIsCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPriority, setNewPriority] = useState<TaskPriority>('MEDIUM')

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        statusFilter === 'ALL' || task.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [tasks, search, statusFilter])

  function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const title = newTitle.trim()
    if (!title) return

    const task: Task = {
      id: Date.now(),
      title,
      description: newDescription.trim(),
      status: 'TODO',
      priority: newPriority,
      dueDate: '',
    }

    setTasks((currentTasks) => [task, ...currentTasks])
    setNewTitle('')
    setNewDescription('')
    setNewPriority('MEDIUM')
    setIsCreating(false)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-violet-400">Workspace</p>
          <h1 className="mt-2 text-3xl font-bold">All tasks</h1>
          <p className="mt-2 text-slate-400">
            Manage and track your work in one place.
          </p>
        </div>

        <button
          onClick={() => setIsCreating((open) => !open)}
          className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          {isCreating ? 'Cancel' : '+ New task'}
        </button>
      </header>

      {isCreating && (
        <form
          onSubmit={handleCreateTask}
          className="space-y-4 rounded-xl border border-slate-800 bg-[#131B30] p-5"
        >
          <h2 className="text-lg font-semibold">Create a task</h2>

          <div>
            <label htmlFor="task-title" className="mb-2 block text-sm text-slate-300">
              Title
            </label>
            <input
              id="task-title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              required
              maxLength={120}
              placeholder="What needs to be done?"
              className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label htmlFor="task-description" className="mb-2 block text-sm text-slate-300">
              Description
            </label>
            <textarea
              id="task-description"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              rows={3}
              placeholder="Add more details..."
              className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label htmlFor="task-priority" className="mb-2 block text-sm text-slate-300">
              Priority
            </label>
            <select
              id="task-priority"
              value={newPriority}
              onChange={(event) =>
                setNewPriority(event.target.value as TaskPriority)
              }
              className="rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm outline-none focus:border-violet-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            Create task
          </button>
        </form>
      )}

      <section className="flex flex-col gap-3 sm:flex-row">
        <input
          aria-label="Search tasks"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tasks..."
          className="min-w-0 flex-1 rounded-lg border border-slate-800 bg-[#131B30] px-4 py-3 text-sm outline-none focus:border-violet-500"
        />

        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-slate-800 bg-[#131B30] px-4 py-3 text-sm outline-none focus:border-violet-500"
        >
          <option value="ALL">All statuses</option>
          <option value="TODO">To do</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="DONE">Done</option>
        </select>
      </section>

      <p className="text-sm text-slate-400">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>

      <section className="space-y-3">
        {filteredTasks.map((task) => (
          <article
            key={task.id}
            className="rounded-xl border border-slate-800 bg-[#131B30] p-5 transition hover:border-slate-700"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <Link
                  to={`/tasks/${task.id}`}
                  className="font-semibold transition hover:text-violet-400"
                >
                  {task.title}
                </Link>
                <p className="mt-2 text-sm text-slate-400">
                  {task.description || 'No description'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-slate-800 px-3 py-1.5 text-slate-300">
                  {statusLabels[task.status]}
                </span>
                <span
                  className={`rounded-full px-3 py-1.5 ${
                    task.priority === 'HIGH'
                      ? 'bg-red-500/10 text-red-400'
                      : task.priority === 'MEDIUM'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-emerald-500/10 text-emerald-400'
                  }`}
                >
                  {priorityLabels[task.priority]}
                </span>
                {task.dueDate && (
                  <span className="text-slate-500">
                    Due {task.dueDate}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}

        {filteredTasks.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-800 p-10 text-center">
            <p className="font-medium">No tasks found</p>
            <p className="mt-2 text-sm text-slate-400">
              Try changing your search or status filter.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default TasksPage
