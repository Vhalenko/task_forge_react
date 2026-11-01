import { useEffect, useState, type FormEvent } from "react";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import Alert from "../components/ui/Alert";
import { useAuth } from "../hooks/useAuth";
import * as userApi from "../api/userApi";
import type { User } from "../types/auth";

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState<Pick<User, "firstName" | "lastName" | "username" | "email">>({ firstName: "", lastName: "", username: "", email: "" });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { if (user) setForm({ firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email }); }, [user]);
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(""); setSaved(false); try { await userApi.updateMe(form); setSaved(true); } catch { setError("Could not update your profile. Please try again."); } };
  return <div className="max-w-3xl"><PageHeader title="Your profile" subtitle="Keep your personal details up to date." /><div className="rounded-2xl border border-white/8 bg-ink-900 p-5 sm:p-7"><div className="mb-8 flex items-center gap-4"><div className="grid size-16 place-items-center rounded-2xl bg-accent text-xl font-semibold text-ink-950">{user?.firstName?.[0] ?? "U"}</div><div><p className="text-lg font-semibold text-white">{user?.firstName} {user?.lastName}</p><p className="text-sm text-ink-400">{user?.role === "ADMIN" ? "Workspace admin" : "Team member"}</p></div></div><Alert>{error}</Alert>{saved && <p className="mb-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent">Profile saved.</p>}<form onSubmit={submit} className="grid gap-5 sm:grid-cols-2"><TextField id="firstName" label="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /><TextField id="lastName" label="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /><TextField id="username" label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /><TextField id="email" type="email" label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><div className="sm:col-span-2"><Button fullWidth={false}>Save changes</Button></div></form></div></div>;
}
