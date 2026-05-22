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
    <div>
      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold text-blue-700">
            EVENTMS
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            {isLogin && (
              <>
                <Link to="/" className="hover:text-blue-600">Dashboard</Link>
                <Link to="/categories" className="hover:text-blue-600">Categories</Link>
                <Link to="/pembicara" className="hover:text-blue-600">Pembicara</Link>
                <Link to="/events" className="hover:text-blue-600">Events</Link>
              </>
            )}

            <Link to="/biodata" className="hover:text-blue-600">Biodata</Link>

            {isLogin ? (
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-blue-600">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
