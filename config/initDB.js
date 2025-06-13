const db = require("./db");

// Query 1: Buat tabel users
const usersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Query 2: Buat tabel dreams
const dreamsTable = `
CREATE TABLE IF NOT EXISTS dreams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

// Eksekusi tabel users dulu
db.query(usersTable, (err, result) => {
  if (err) {
    console.error("Error creating users table:", err);
    return;
  }
  console.log("Users table created or already exists.");

  // Baru lanjut buat tabel dreams
  db.query(dreamsTable, (err, result) => {
    if (err) {
      console.error("Error creating dreams table:", err);
      return;
    }
    console.log("Dreams table created or already exists.");
  });
});
