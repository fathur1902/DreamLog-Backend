const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authenticateToken = require("../middleware/auth"); 

// GET /api/dreams - Get dreams for the authenticated user
router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id; 

  const query = "SELECT * FROM dreams WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST /api/dreams - Add a new dream for the authenticated user
router.post("/", authenticateToken, (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id; 

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  const query =
    "INSERT INTO dreams (user_id, title, description) VALUES (?, ?, ?)";
  db.query(query, [userId, title, description], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, user_id: userId, title, description });
  });
});

// PUT /api/dreams/:id - Update a dream (only for the authenticated user's dream)
router.put("/:id", authenticateToken, (req, res) => {
  const dreamId = req.params.id;
  const { title, description } = req.body;
  const userId = req.user.id;

  const query =
    "UPDATE dreams SET title = ?, description = ? WHERE id = ? AND user_id = ?";
  db.query(query, [title, description, dreamId, userId], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Dream not found or not authorized" });
    }
    res.json({ message: "Dream updated successfully" });
  });
});

// DELETE /api/dreams/:id - Delete a dream (only for the authenticated user's dream)
router.delete("/:id", authenticateToken, (req, res) => {
  const dreamId = req.params.id;
  const userId = req.user.id;

  const query = "DELETE FROM dreams WHERE id = ? AND user_id = ?";
  db.query(query, [dreamId, userId], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Dream not found or not authorized" });
    }
    res.json({ message: "Dream deleted successfully" });
  });
});

module.exports = router;
