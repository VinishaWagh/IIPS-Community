const pool = require("./db");

// Create attachments table if it doesn't exist
async function createAttachmentsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS attachments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        path VARCHAR(255) NOT NULL,
        mimetype VARCHAR(100),
        size INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ Attachments table created successfully");
  } catch (error) {
    console.error("✗ Error creating attachments table:", error.message);
  }
}

// Run the migration
createAttachmentsTable().then(() => {
  console.log("Migration complete");
  process.exit(0);
}).catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
