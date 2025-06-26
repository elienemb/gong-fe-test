import { useAuth } from "../context/AuthSession";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Hierarchy() {
  const { user, setUser } = useAuth();
  const [tree, setTree] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    fetch("https://gongfetest.firebaseio.com/users.json")
      .then((res) => res.json())
      .then((data) => setTree(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800 tracking-tight">
          Hierarchy Tree
        </div>
        <div className="flex items-center gap-4">
          <span className="text-base text-gray-700">
            {user?.firstName} {user?.lastName}
          </span>
          <button
            onClick={logout}
            className="rounded-lg border border-indigo-500 px-4 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-100"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-10">
        {tree ? (
          <pre className="rounded-xl bg-white p-4 shadow-inner text-xs text-gray-700 overflow-auto">
            {JSON.stringify(tree, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500">Loading hierarchy...</p>
        )}
      </div>
    </div>
  );
}
