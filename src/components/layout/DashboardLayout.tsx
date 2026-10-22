
import { NavLink, Outlet } from 'react-router'

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: '◫' },
  { label: 'All tasks', to: '/tasks', icon: '☷' },
  { label: 'Board', to: '/board', icon: '▦' },
  { label: 'Settings', to: '/settings', icon: '⚙' },
]

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0B1020] text-white md:flex">
      <aside className="border-b border-slate-800 bg-[#10172A] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <NavLink
          to="/dashboard"
          className="mb-8 flex items-center gap-3 text-xl font-bold"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-violet-600">
            T
          </span>
          TaskForge
        </NavLink>

        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
          <span className="text-sm text-slate-400">
            Your workspace
          </span>

          <div className="flex size-9 items-center justify-center rounded-full bg-violet-600 font-semibold">
            U
          </div>
        </header>

        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
