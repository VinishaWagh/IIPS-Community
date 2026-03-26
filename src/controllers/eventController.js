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