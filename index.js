const express = require("express");
const cors = require("cors");
const dreamRoutes = require("./routes/dreams");
const userRoutes = require("./routes/users");

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/dreams", dreamRoutes);
app.use("/api/users", userRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
