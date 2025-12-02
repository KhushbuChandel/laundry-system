const mysql = require("mysql2");

// Create MySQL connection pool with reconnection support
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: {
    rejectUnauthorized: false
  }
});

// Handle connection errors (important for Railway free plan)
db.on("error", (err) => {
  console.error("MYSQL ERROR:", err.code);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("⚠️ MySQL connection lost. Reconnecting...");
  }
});

// Test pool
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully!");
    connection.release();
  }
});

module.exports = db;
