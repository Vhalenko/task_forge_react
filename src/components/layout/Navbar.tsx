import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="text-sm font-semibold tracking-tight text-neutral-900">TaskForge</span>
          <nav className="flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>
              Tasks
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span className="hidden sm:inline">
            {user?.firstName} {user?.lastName}
          </span>
          <button
            onClick={logout}
            className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
