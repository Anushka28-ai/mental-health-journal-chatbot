const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mood: { type: String, required: true },
  note: { type: String }, // optional daily note
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Journal", journalSchema);
