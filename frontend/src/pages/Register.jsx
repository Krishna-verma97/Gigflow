import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registeration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "10px" }}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
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
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}
