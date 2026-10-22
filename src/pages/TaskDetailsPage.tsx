
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

type Task = {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdBy: string
  assignedTo: string
  createdAt: string
}

const demoTask: Task = {
  id: 1,
  title: 'Create authentication API',
  description:
    'Implement registration and login endpoints using Spring Boot. Add request validation and handle errors correctly.',
  status: 'IN_PROGRESS',
  priority: 'HIGH',
  dueDate: '2026-10-21',
  createdBy: 'John Doe',
  assignedTo: 'Jane Smith',
  createdAt: '2026-10-15',
}

function TaskDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState<Task | null>(
    id === String(demoTask.id) ? demoTask : null,
  )
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState<TaskStatus>(
    task?.status ?? 'TODO',
  )
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? 'MEDIUM',
  )
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '')

  if (!task) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <h1 className="text-2xl font-bold">Task not found</h1>
        <p className="mt-3 text-slate-400">
          This task does not exist or is not available.
        </p>
        <Link
          to="/tasks"
          className="mt-6 inline-block text-violet-400 hover:text-violet-300"
        >
          ← Back to tasks
        </Link>
      </div>
    )
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setTask((current) =>
      current
        ? {
            ...current,
            title: title.trim(),
            description: description.trim(),
            status,
            priority,
            dueDate,
          }
        : current,
    )

    setIsEditing(false)
  }

  function handleDelete() {
    // Пока удаление имитируется — API ещё не подключён.
    setIsDeleting(false)
    navigate('/tasks')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <Link
        to="/tasks"
        className="text-sm text-slate-400 transition hover:text-white"
      >
        ← Back to tasks
      </Link>

      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm text-violet-400">Task #{task.id}</p>
          <h1 className="mt-2 text-3xl font-bold">{task.title}</h1>
          <p className="mt-2 text-sm text-slate-400">
            Created by {task.createdBy} · {task.createdAt}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsEditing((value) => !value)}
            className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm hover:bg-slate-800"
          >
            {isEditing ? 'Cancel editing' : 'Edit task'}
          </button>

          <button
            type="button"
            onClick={() => setIsDeleting(true)}
            className="rounded-lg border border-red-500/30 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </header>

      {isDeleting && (
        <div
          role="alertdialog"
          aria-labelledby="delete-title"
          aria-describedby="delete-description"
          className="rounded-xl border border-red-500/30 bg-red-500/5 p-5"
        >
          <h2 id="delete-title" className="font-semibold">
            Delete this task?
          </h2>
          <p id="delete-description" className="mt-2 text-sm text-slate-400">
            This action cannot be undone.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500"
            >
              Confirm delete
            </button>
            <button
              type="button"
              onClick={() => setIsDeleting(false)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isEditing ? (
        <form
          onSubmit={handleSave}
          className="space-y-5 rounded-xl border border-slate-800 bg-[#131B30] p-6"
        >
          <div>
            <label htmlFor="title" className="mb-2 block text-sm text-slate-300">
              Title
            </label>
            <input
              id="title"
              required
              maxLength={120}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="status" className="mb-2 block text-sm text-slate-300">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as TaskStatus)
                }
                className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 outline-none focus:border-violet-500"
              >
                <option value="TODO">To do</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="mb-2 block text-sm text-slate-300">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as TaskPriority)
                }
                className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 outline-none focus:border-violet-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate" className="mb-2 block text-sm text-slate-300">
              Due date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            Save changes
          </button>
        </form>
      ) : (
        <div className="grid gap-5 md:grid-cols-[1fr_280px]">
          <section className="rounded-xl border border-slate-800 bg-[#131B30] p-6">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">
              {task.description || 'No description provided.'}
            </p>
          </section>

          <aside className="space-y-5 rounded-xl border border-slate-800 bg-[#131B30] p-6">
            <div>
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-2 font-medium">
                {task.status === 'TODO'
                  ? 'To do'
                  : task.status === 'IN_PROGRESS'
                    ? 'In progress'
                    : 'Done'}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Priority</p>
              <p className="mt-2 font-medium">{task.priority}</p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Assigned to</p>
              <p className="mt-2 font-medium">{task.assignedTo}</p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Due date</p>
              <p className="mt-2 font-medium">
                {task.dueDate || 'No due date'}
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default TaskDetailsPage
