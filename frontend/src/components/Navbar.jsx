import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        padding: "12px",
        borderBottom: "2px solid #1f2937",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Link to="/">Gigs</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
      </div>

      {user && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>Hi, {user.name}</span>
          <button
            onClick={handleLogout}
            style={{
              background: "#1f2937",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
