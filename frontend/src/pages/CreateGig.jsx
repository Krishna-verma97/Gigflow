import { useState } from "react";
import api from "../api";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleCreate = async () => {
    await api.post("/gigs", { title, description, budget });
    alert("Gig created");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "10px" }}>
      <h2>Create Gig</h2>
      <input
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
        placeholder="Budget"
        onChange={(e) => setBudget(e.target.value)}
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
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
  );
}
