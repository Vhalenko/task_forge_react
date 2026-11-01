import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "./Navbar";

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-ink-950 antialiased">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-5 py-8 lg:ml-64 lg:px-10 lg:py-10">
        {user && !user.teamId && (
          <div className="mb-6 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            You are not in a team yet. Ask an admin to add you using your email address.
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
