import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Layout() {
  const navigate = useNavigate();
  const { isLogin, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow">
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold text-blue-700">EVENTMS</h1>
          <p className="text-sm text-gray-500">Event Management</p>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {isLogin && (
            <>
              <Link to="/" className="rounded px-4 py-2 hover:bg-blue-50 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/categories" className="rounded px-4 py-2 hover:bg-blue-50 hover:text-blue-600">
                Categories
              </Link>
              <Link to="/pembicara" className="rounded px-4 py-2 hover:bg-blue-50 hover:text-blue-600">
                Pembicara
              </Link>
              <Link to="/events" className="rounded px-4 py-2 hover:bg-blue-50 hover:text-blue-600">
                Events
              </Link>
            </>
          )}

          <Link to="/biodata" className="rounded px-4 py-2 hover:bg-blue-50 hover:text-blue-600">
            Biodata
          </Link>

          {isLogin ? (
            <button
              onClick={handleLogout}
              className="mt-4 rounded px-4 py-2 text-left text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="rounded px-4 py-2 hover:bg-blue-50 hover:text-blue-600">
              Login
            </Link>
          )}
        </nav>
      </aside>

      <main className="ml-64 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}