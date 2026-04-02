const pool = require("../config/db");

exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await pool.query(
      `SELECT * FROM events 
       WHERE event_date >= CURRENT_DATE 
       ORDER BY event_date ASC 
       LIMIT 5`
    );
    res.json(events.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, event_date, color } = req.body;
    if (!title || !event_date)
      return res.status(400).json({ message: "Title and date are required." });

    const result = await pool.query(
      `INSERT INTO events (title, event_date, color) VALUES ($1, $2, $3) RETURNING *`,
      [title, event_date, color || "#3b82f6"]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await pool.query("DELETE FROM events WHERE id = $1", [req.params.id]);
    res.json({ message: "Event deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};