import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";

const linkClass = ({ isActive }: { isActive: boolean }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-white/10 text-white" : "text-ink-400 hover:bg-white/5 hover:text-white"}`;

const Icon = ({ children }: { children: ReactNode }) => <span className="grid size-5 place-items-center text-xs text-current">{children}</span>;

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-white/8 bg-ink-900/90 lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:border-white/8">
      <div className="flex items-center justify-between px-5 py-5 lg:block lg:px-6">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"><span className="grid size-8 place-items-center rounded-lg bg-accent text-ink-950">✦</span>TaskForge</span>
        <span className="hidden text-xs text-ink-400 lg:mt-2 lg:block">Team workspace</span>
        <button onClick={logout} className="text-xs font-medium text-ink-400 hover:text-white lg:hidden">Log out</button>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1 lg:px-4 lg:py-8">
        <NavLink to="/" end className={linkClass}><Icon>▦</Icon>My tasks</NavLink>
        <NavLink to="/projects" className={linkClass}><Icon>▤</Icon>Projects</NavLink>
        <NavLink to="/profile" className={linkClass}><Icon>◉</Icon>Profile</NavLink>
        {user?.role === "ADMIN" && <NavLink to="/admin/teams" className={linkClass}><Icon>♙</Icon>Admin</NavLink>}
      </nav>
      <div className="mt-auto hidden border-t border-white/8 p-4 lg:block">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-accent font-semibold text-ink-950">{user?.firstName?.[0] ?? "U"}</div>
          <div className="min-w-0"><p className="truncate text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p><p className="truncate text-xs text-ink-400">{user?.email}</p></div>
        </div>
        <button onClick={logout} className="w-full rounded-lg px-3 py-2 text-left text-sm text-ink-400 hover:bg-white/5 hover:text-white">Log out</button>
      </div>
    </header>
  );
}
