import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-primary-800 to-primary-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-accent-400">TodoApp</h1>
            <div className="flex gap-6">
              <Link
                to="/todos"
                className={`hover:text-accent-300 transition-colors ${
                  isActive("/todos") ? "border-b-2 border-accent-400 pb-1" : ""
                }`}
              >
                Todos
              </Link>
              <Link
                to="/profile"
                className={`hover:text-accent-300 transition-colors ${
                  isActive("/profile") ? "border-b-2 border-accent-400 pb-1" : ""
                }`}
              >
                Profile
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className={`hover:text-accent-300 transition-colors ${
                    isActive("/admin") ? "border-b-2 border-accent-400 pb-1" : ""
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-accent-500/20 px-3 py-1 rounded-full">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
