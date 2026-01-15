import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Bids() {
  const { gigId } = useParams();

  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [gig, setGig] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/gigs/${gigId}`).then((res) => setGig(res.data));
    api.get(`/bids/${gigId}`).then((res) => setBids(res.data));
  }, [gigId]);

  const submitBid = async () => {
    try {
      await api.post(`/bids/${gigId}`, { amount, message });
      alert("Bid submitted");
      window.location.reload();
    } catch {
      alert("Cannot submit bid");
    }
  };

  const hire = async (bidId) => {
    try {
      console.log("Hiring bid:", bidId);

      const res = await api.patch(`/bids/${gigId}/hire/${bidId}`);

      console.log("Hire response:", res.data);

      alert("Freelancer hired successfully!");

      window.location.reload();
    } catch (error) {
      console.error("Hire failed:", error.response?.data || error.message);
      alert("Hire failed. Check console.");
    }
  };

  if (!user) return <p>Loading user...</p>;
  if (!gig) return <p>Loading gig...</p>;

  const isOwner =
    user && gig && (user._id === gig.owner._id || user._id === gig.owner);

  return (
    <div
      style={{
        border: "1px solid #1f2937",
        padding: "10px",
        borderRadius: "6px",
        background: "#f9fafb",
        marginBottom: "10px",
        color: "black",
      }}
    >
      <h2>{gig.title}</h2>

      {/* STATUS BADGE */}
      {gig.status === "assigned" && (
        <p style={{ color: "red" }}>This gig is closed</p>
      )}

      {/* BID FORM (ONLY IF NOT OWNER & OPEN) */}
      {!isOwner && gig.status === "open" && (
        <>
          <h3>Submit Bid</h3>
          <input
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={submitBid}>Submit Bid</button>
        </>
      )}

      <hr />

      <h3>Bids</h3>

      {bids.map((bid) => (
        <div
          key={bid._id}
          style={{
            border: "1px solid #1f2937",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            background: "#cee7ff",
            color: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            <b>{bid.freelancer.name}</b>
            <span>₹{bid.amount}</span>
          </div>

          <p>{bid.message}</p>

          {isOwner && gig.status === "open" && (
            <button
              onClick={() => hire(bid._id)}
              style={{
                width: "100%",
                maxWidth: "150px",
                padding: "6px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginTop: "6px",
              }}
            >
              Hire
            </button>
          )}

          {bid.status === "hired" && (
            <p style={{ color: "#16a34a", fontWeight: "bold" }}>✅ HIRED</p>
          )}
          {bid.status === "rejected" && (
            <p style={{ color: "#dc2626", fontWeight: "bold" }}>❌ Rejected</p>
          )}
        </div>
      ))}
    </div>
  );
}
