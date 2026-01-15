import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get(`/gigs?search=${search}`).then((res) => setGigs(res.data));
  }, [search]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "10px" }}>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search gigs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 14px",
            borderRadius: "4px",
            border: "none",
            background: "#1f2937",
            color: "white",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Search
        </button>
      </form>

      <h2>Open Gigs</h2>
      <Link to="/create-gig">Post Gig</Link>

      {gigs.map((gig) => (
        <div
          key={gig._id}
          style={{
            border: "1.8px solid #a2f7c5",
            padding: "12px",
            marginBottom: "14px",
            borderRadius: "8px",
            background: "#f9fafb",
            color: "black",
          }}
        >
          <h3 style={{ color: "#1f2937" }}>{gig.title}</h3>
          <p>{gig.description}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <p>₹{gig.budget}</p>

            {/* STATUS STYLING */}
            <p
              style={{
                fontWeight: "bold",
                color: gig.status === "assigned" ? "#dc2626" : "#16a34a",
              }}
            >
              Status: {gig.status === "assigned" ? "Closed" : "Open"}
            </p>
          </div>
          <Link to={`/bids/${gig._id}`} style={{ color: "#1f2937" }}>
            View / Bid
          </Link>
        </div>
      ))}
    </div>
  );
}
