const express = require("express");
const cors = require("cors");
const dreamRoutes = require("./routes/dreams");
const userRoutes = require("./routes/users");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*", 
  })
);
app.use(express.json());

app.get("/api/config", (req, res) => {
  const baseUrl = process.env.SERVER_URL || `https://${req.hostname}`;
  res.json({ baseUrl });
});

app.use("/api/dreams", dreamRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
