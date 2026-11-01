import { useState } from "react";
import * as userApi from "../../api/userApi";
import type { User } from "../../types/auth";
import { parseApiError } from "../../utils/apiError";
import ConfirmAction from "../ui/ConfirmAction";

interface MemberRowProps {
  member: User;
  isSelf: boolean;
  onChange: (member: User) => void;
}

export default function MemberRow({ member, isSelf, onChange }: MemberRowProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const toggleBlocked = async () => {
    setBusy(true);
    setError("");
    try {
      await userApi.setUserBlocked(member.id, !member.blocked);
      onChange({ ...member, blocked: !member.blocked });
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setBusy(false);
    }
  };

  const makeAdmin = async () => {
    await userApi.setUserRole(member.id, "ADMIN");
    onChange({ ...member, role: "ADMIN" });
  };

  return (
    <li className="py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-neutral-900">
            {member.firstName} {member.lastName}
            {isSelf && <span className="font-normal text-neutral-500"> (you)</span>}
          </p>
          <p className="truncate text-sm text-neutral-500">{member.email}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-4 text-sm">
          {member.role === "ADMIN" && (
            <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white">
              Admin
            </span>
          )}
          {member.blocked && (
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
              Blocked
            </span>
          )}

          {!isSelf && (
            <>
              {member.role !== "ADMIN" && (
                <ConfirmAction
                  label="Make admin"
                  question="Make this user an admin?"
                  onConfirm={makeAdmin}
                />
              )}
              <button
                type="button"
                onClick={toggleBlocked}
                disabled={busy}
                className="text-neutral-500 hover:text-neutral-900 disabled:opacity-50"
              >
                {member.blocked ? "Unblock" : "Block"}
              </button>
            </>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </li>
  );
}
