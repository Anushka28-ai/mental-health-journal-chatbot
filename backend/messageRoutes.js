const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ reply: "Backend is working 💙" });
});

router.post("/", async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ success: false, error: "Name and message required" });

  // Your bot logic here
  let botReply = "Thanks for sharing! 💙"; // default
  const msgLower = message.toLowerCase();

  if (["😃", "🙂"].includes(message)) botReply = "Yay! Keep smiling 😄";
  else if (["😐"].includes(message)) botReply = "Take it easy 🌿";
  else if (["😔", "😣"].includes(message)) botReply = "I’m here for you 💙";
  else if (msgLower.includes("sad")) botReply = "I’m sorry you feel sad. Want to talk about it?";
  else if (msgLower.includes("happy")) botReply = "That’s wonderful! Keep your spirits high 😄";

  try {
    const newMessage = await Message.create({ name, message, botReply });

res.json({
  reply: botReply
});

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
