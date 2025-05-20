const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Tambah mimpi
router.post("/", (req, res) => {
  const { title, description } = req.body;
  const query = "INSERT INTO dreams (title, description) VALUES (?, ?)";
  db.query(query, [title, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Dream saved", id: result.insertId });
  });
});

// Ambil semua mimpi
router.get("/", (req, res) => {
  const query = "SELECT * FROM dreams";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Edit mimpi
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const query = "UPDATE dreams SET title = ?, description = ? WHERE id = ?";
  db.query(query, [title, description, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dream not found" });
    }
    res.json({ message: "Dream updated" });
  });
});

// Hapus mimpi
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM dreams WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dream not found" });
    }
    res.json({ message: "Dream deleted" });
  });
});

module.exports = router;