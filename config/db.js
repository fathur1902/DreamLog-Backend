const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Ganti dengan password MySQL Anda
    database: 'dreamlog_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Buat tabel jika belum ada
db.query(`
    CREATE TABLE IF NOT EXISTS dreams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        emotion VARCHAR(50)
    )
`, err => {
    if (err) console.error('Error creating table:', err);
});

module.exports = db;