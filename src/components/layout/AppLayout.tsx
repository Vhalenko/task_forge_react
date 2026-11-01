import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "./Navbar";

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-10">
        {user && !user.teamId && (
          <div className="mb-8 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
            You are not in a team yet. Ask an admin to add you using your email address.
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
