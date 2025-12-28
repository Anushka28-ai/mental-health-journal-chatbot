const express = require("express");
const router = express.Router();
const Journal = require("../../models/Journal");


// POST /journal - save daily entry
router.post("/", async (req, res) => {
  const { name, mood, note } = req.body;

  if (!name || !mood) {
    return res.status(400).json({ success: false, error: "Name and mood required" });
  }

  try {
    const newEntry = await Journal.create({ name, mood, note });
    res.json({ success: true, data: newEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET /journal - get all entries
router.get("/", async (req, res) => {
  try {
    const entries = await Journal.find().sort({ createdAt: -1 });
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
