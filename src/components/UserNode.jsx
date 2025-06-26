import { useState } from "react";

export default function UserNode({ user }) {
  const [open, setOpen] = useState(true);
  const isManager = user.children && user.children.length > 0;

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;

  return (
    <div className="ml-4 border-l border-gray-300 pl-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => isManager && setOpen(!open)}
          className="text-sm w-4 text-center text-gray-600 cursor-default"
          aria-label={isManager ? "Toggle children" : "No subordinates"}
        >
          {isManager ? (open ? "+" : "+") : "–"}
        </button>
        {user.photo ? (
          <img
            src={user.photo}
            onError={(e) => (e.target.style.display = "none")}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-700 font-semibold">
            {initials}
          </div>
        )}
        <div>
          <div className="font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>

      {open && isManager && (
        <div className="mt-2 space-y-2">
          {user.children.map((child) => (
            <UserNode key={child.id} user={child} />
          ))}
        </div>
      )}
    </div>
  );
}
