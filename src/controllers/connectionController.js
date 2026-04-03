const pool = require("../config/db");

// Send connection request
exports.sendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.params;

    if (senderId == receiverId)
      return res.status(400).json({ message: "Cannot connect with yourself." });

    const existing = await pool.query(
      "SELECT * FROM connections WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)",
      [senderId, receiverId]
    );
    if (existing.rows.length > 0)
      return res.status(400).json({ message: "Request already exists." });

    const result = await pool.query(
      "INSERT INTO connections (sender_id, receiver_id) VALUES ($1, $2) RETURNING *",
      [senderId, receiverId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept or reject a request
exports.respondRequest = async (req, res) => {
  try {
    const { connectionId } = req.params;
    const { status } = req.body; // "accepted" or "rejected"

    const conn = await pool.query("SELECT * FROM connections WHERE id = $1", [connectionId]);
    if (conn.rows.length === 0)
      return res.status(404).json({ message: "Request not found." });

    if (conn.rows[0].receiver_id !== req.user.id)
      return res.status(403).json({ message: "Not authorized." });

    if (status === "rejected") {
      await pool.query("DELETE FROM connections WHERE id = $1", [connectionId]);
      return res.json({ message: "Request rejected." });
    }

    const updated = await pool.query(
      "UPDATE connections SET status = $1 WHERE id = $2 RETURNING *",
      [status, connectionId]
    );
    res.json(updated.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pending requests received by current user
exports.getPendingRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT connections.id, connections.created_at,
       users.id AS sender_id, users.name AS sender_name, users.role AS sender_role
       FROM connections
       JOIN users ON connections.sender_id = users.id
       WHERE connections.receiver_id = $1 AND connections.status = 'pending'
       ORDER BY connections.created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get connection status between current user and another user
exports.getConnectionStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT * FROM connections
       WHERE (sender_id = $1 AND receiver_id = $2)
       OR (sender_id = $2 AND receiver_id = $1)`,
      [req.user.id, userId]
    );
    if (result.rows.length === 0)
      return res.json({ status: "none" });

    const conn = result.rows[0];
    if (conn.status === "accepted")
      return res.json({ status: "connected" });
    if (conn.sender_id === req.user.id)
      return res.json({ status: "pending_sent" });
    return res.json({ status: "pending_received", connectionId: conn.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all accepted connections
exports.getMyConnections = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT users.id, users.name, users.role, users.email
       FROM connections
       JOIN users ON (
         CASE WHEN connections.sender_id = $1 THEN connections.receiver_id
              ELSE connections.sender_id END = users.id
       )
       WHERE (connections.sender_id = $1 OR connections.receiver_id = $1)
       AND connections.status = 'accepted'`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};