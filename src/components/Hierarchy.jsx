import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthSession";
import { useNavigate } from "react-router-dom";
import UserNode from "../components/UserNode";

export default function Hierarchy() {
  const { user, logout } = useAuth();
  const [tree, setTree] = useState([]);
  const [userMap, setUserMap] = useState({});
  const goTo = useNavigate();

  useEffect(() => {
    const fetchHierarchy = async () => {
      const res = await fetch("https://gongfetest.firebaseio.com/users.json");
      const data = await res.json();
      const users = Object.values(data);

      const userMap = {};
      const managerMap = {};

      users.forEach((u) => {
        userMap[u.id] = u;
        if (!u.managerId) return;
        if (!managerMap[u.managerId]) managerMap[u.managerId] = [];
        managerMap[u.managerId].push(u);
      });

      const buildTree = (managerId) => {
        const subs = managerMap[managerId] || [];
        return subs.map((u) => ({
          ...u,
          children: buildTree(u.id),
        }));
      };

      const roots = users
        .filter((u) => !u.managerId)
        .map((u) => ({
          ...u,
          children: buildTree(u.id),
        }));

      setUserMap(userMap);
      setTree(roots);
    };
    fetchHierarchy();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="flex justify-between mb-6">
        <div></div>
        <div className="text-sm text-gray-700 flex items-center gap-3">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-700 font-semibold">
              {user.fallbackInitials}
            </div>
          )}
          <span>
            {user.firstName} {user.lastName}
          </span>
          <button
            onClick={() => {
              logout();
              goTo("/login");
            }}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tree.map((u) => (
          <UserNode key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
}
