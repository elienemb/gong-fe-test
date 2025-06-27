import { useState } from "react";

export default function UserNode({ user }) {
  const [open, setOpen] = useState(true);// State to manage visibility of children nodes
  const isManager = user.children && user.children.length > 0;// Check if the user has subordinates

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;// Generate initials from first and last name

  return (
    <div className="ml-4 pl-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => isManager && setOpen(!open)} // Toggle children visibility
          className={
            "text-sm w-4 text-center text-gray-600" +
            (isManager ? " cursor-pointer" : " cursor-default")
          }
          aria-label={isManager ? "Toggle children" : "No subordinates"}
        >
          {isManager ? (open ? "+" : "+") : "–"}
        </button>
        {user.photo ? (
          <img
            src={user.photo}
            onError={(e) => (e.target.style.display = "none")} // Hide image if it fails to load
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          // Fallback to initials if no photo
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-700 font-semibold">
            {initials}
          </div>
        )}
        <div>
          <div
            className={
              "font-medium text-gray-900" + (isManager ? " font-bold" : "")
            }
          >
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>

      {open &&
        isManager && ( // Render children if the node is expanded and has subordinates
          <div className="mt-2 space-y-2">
            {user.children.map(
              (
                child // Map through children and render UserNode for each
              ) => (
                <UserNode key={child.id} user={child} />
              )
            )}
          </div>
        )}
    </div>
  );
}
