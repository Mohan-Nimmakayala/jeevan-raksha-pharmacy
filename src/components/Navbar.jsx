import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">Pharmacy Management System</h1>

        <div className="navbar-menu">
          {user && (
            <span className="navbar-user">
              {user.fullName} <span className="navbar-role">({user.role?.replace("ROLE_", "")})</span>
            </span>
          )}

          <button type="button" className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
