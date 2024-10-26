import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className="navbar bg-gradient-to-r from-gray-800 via-gray-900 to-navy-900 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-bold text-white hover:text-blue-400"
          >
            Content Management System
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/categories" className="hover:text-blue-400">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/add-product" className="hover:text-blue-400">
                Add Product
              </Link>
            </li>
            {localStorage.access_token && (
              <li>
                <Link to="/add-user" className="hover:text-blue-400">
                  Add User
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-outline btn-error hover:bg-red-600 hover:text-white transition-all duration-300"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
