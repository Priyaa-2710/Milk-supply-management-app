import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition
     ${
       isActive
         ? "bg-[#b37c4d] text-white"
         : "text-[#8b5e3c] hover:bg-[#f8eede]"
     }`;

  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="text-xl font-bold text-[#b37c4d]">
            Milk Manager
          </div>

          {/* Links */}
          <div className="flex items-center space-x-2">
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/milk-entry" className={linkClass}>
              Milk Entry
            </NavLink>

            <NavLink to="/customers" className={linkClass}>
              Customers
            </NavLink>

            <NavLink to="/monthly-bill" className={linkClass}>
              Billing
            </NavLink>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-200 hover:bg-red-400 transition"
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