
const stats = [
  { label: 'Total tasks', value: '12', color: 'text-white' },
  { label: 'In progress', value: '5', color: 'text-violet-400' },
  { label: 'Completed', value: '4', color: 'text-emerald-400' },
  { label: 'Overdue', value: '3', color: 'text-red-400' },
]

function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section>
        <p className="text-sm text-violet-400">Overview</p>
        <h1 className="mt-2 text-3xl font-bold">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-400">
          Keep track of your work and make progress every day.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-[#131B30] p-5"
          >
            <p className="text-sm text-slate-400">
              {stat.label}
            </p>
            <p className={`mt-4 text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-slate-800 bg-[#131B30] p-6">
        <h2 className="text-lg font-semibold">Getting started</h2>
        <p className="mt-2 text-sm text-slate-400">
          Your tasks will appear here once we connect the backend.
        </p>
      </section>
    </div>
  )
}

export default DashboardPage
