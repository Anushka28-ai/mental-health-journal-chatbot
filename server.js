const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const messageRoutes = require("./backend/messageRoutes.js");
const journalRoutes = require("./backend/routes/journalRoutes.js");




const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));


// Use the routes
app.use("/messages", messageRoutes);
app.use("/journals", journalRoutes);

app.get("/test", (req, res) => {
  res.send("Server is working 💙");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
