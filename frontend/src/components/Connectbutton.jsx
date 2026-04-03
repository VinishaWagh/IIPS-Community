import { useState, useEffect } from "react";
import API from "../api/api";

/**
 * ConnectButton
 * Props:
 *   targetUserId — the user you want to connect with
 *   currentUserId — the logged-in user's id
 *
 * Usage:
 *   <ConnectButton targetUserId={s.id} currentUserId={currentUser.id} />
 */
export default function ConnectButton({ targetUserId, currentUserId }) {
  const [status, setStatus] = useState("loading"); // "none" | "pending_sent" | "pending_received" | "connected" | "loading"
  const [connectionId, setConnectionId] = useState(null);
  const [working, setWorking] = useState(false);

  /* GET STATUS — GET /api/connections/status/:userId */
  useEffect(() => {
    if (!targetUserId || !currentUserId || targetUserId === currentUserId) return;
    API.get(`/connections/status/${targetUserId}`)
      .then(r => {
        setStatus(r.data.status);
        if (r.data.connectionId) setConnectionId(r.data.connectionId);
      })
      .catch(() => setStatus("none"));
  }, [targetUserId, currentUserId]);

  /* SEND REQUEST — POST /api/connections/request/:receiverId */
  const handleConnect = async () => {
    setWorking(true);
    try {
      await API.post(`/connections/request/${targetUserId}`);
      setStatus("pending_sent");
    } catch (err) {
      console.error(err);
    } finally {
      setWorking(false);
    }
  };

  /* ACCEPT — PUT /api/connections/respond/:connectionId  body: { status: "accepted" } */
  const handleAccept = async () => {
    setWorking(true);
    try {
      await API.put(`/connections/respond/${connectionId}`, { status: "accepted" });
      setStatus("connected");
    } catch (err) {
      console.error(err);
    } finally {
      setWorking(false);
    }
  };

  /* REJECT — PUT /api/connections/respond/:connectionId  body: { status: "rejected" } */
  const handleReject = async () => {
    setWorking(true);
    try {
      await API.put(`/connections/respond/${connectionId}`, { status: "rejected" });
      setStatus("none");
      setConnectionId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setWorking(false);
    }
  };

  if (targetUserId === currentUserId) return null;

  const base = {
    fontFamily: "'Nunito', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 16,
    cursor: working ? "not-allowed" : "pointer",
    padding: "5px 12px",
    transition: "all 0.15s",
    border: "1.5px solid",
    opacity: working ? 0.7 : 1,
  };

  if (status === "loading") {
    return <button style={{ ...base, background: "#f0f2f5", color: "#9ca3af", borderColor: "#e5e7eb" }} disabled>...</button>;
  }

  if (status === "none") {
    return (
      <button
        style={{ ...base, background: "none", color: "#1e3a5f", borderColor: "#1e3a5f" }}
        onClick={handleConnect}
        disabled={working}
        onMouseEnter={e => { e.target.style.background = "#1e3a5f"; e.target.style.color = "#fff"; }}
        onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = "#1e3a5f"; }}
      >
        + Connect
      </button>
    );
  }

  if (status === "pending_sent") {
    return (
      <button
        style={{ ...base, background: "#f0f2f5", color: "#9ca3af", borderColor: "#e5e7eb", cursor: "default" }}
        disabled
      >
        ⏳ Pending
      </button>
    );
  }

  if (status === "pending_received") {
    return (
      <div style={{ display: "flex", gap: 6 }}>
        <button
          style={{ ...base, background: "#1e3a5f", color: "#fff", borderColor: "#1e3a5f" }}
          onClick={handleAccept}
          disabled={working}
        >
          ✓ Accept
        </button>
        <button
          style={{ ...base, background: "none", color: "#e11d48", borderColor: "#fecdd3" }}
          onClick={handleReject}
          disabled={working}
        >
          ✕
        </button>
      </div>
    );
  }

  if (status === "connected") {
    return (
      <button
        style={{ ...base, background: "#dcfce7", color: "#15803d", borderColor: "#bbf7d0", cursor: "default" }}
        disabled
      >
        ✓ Connected
      </button>
    );
  }

  return null;
}