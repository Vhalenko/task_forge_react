import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white antialiased">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <span className="text-sm font-semibold tracking-tight text-neutral-900">TaskForge</span>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span>
            {user?.firstName} {user?.lastName}
          </span>
          <button
            onClick={logout}
            className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Welcome, {user?.firstName}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">Your tasks will appear here.</p>
      </main>
    </div>
  );
}
