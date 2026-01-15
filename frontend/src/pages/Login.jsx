import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      setUser(res.data.user);

      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "10px" }}>
      <h2>Login</h2>
      <input
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "#1f2937",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
