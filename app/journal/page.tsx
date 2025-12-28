"use client";

import React, { useState } from "react";

export default function JournalPage() {
  const [entry, setEntry] = useState<string>("");
  const [mood, setMood] = useState<string>("Happy");
  const [saving, setSaving] = useState<boolean>(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Example POST to your backend. Adjust URL/path to match your server routes.
      // If backend runs on a different port while developing, use the full URL:
      // const res = await fetch("http://localhost:5000/api/journals", { ... })
      const res = await fetch("/api/journals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, entry, date: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      // Reset or show confirmation
      setEntry("");
      setMood("Happy");
      alert("Entry saved");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save entry (check console)");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 680 }}>
      <h2>Daily Mental Health Journal</h2>

      <label htmlFor="mood">Mood:</label>
      <br />
      <select
        id="mood"
        value={mood}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setMood(e.target.value)
        }
      >
        <option>Happy</option>
        <option>Neutral</option>
        <option>Sad</option>
        <option>Angry</option>
        <option>Anxious</option>
      </select>

      <br />
      <br />

      <textarea
        rows={8}
        cols={60}
        value={entry}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setEntry(e.target.value)
        }
        placeholder="Write how you feel today..."
        style={{ width: "100%", minHeight: 160, padding: 8, fontSize: 15 }}
      />

      <br />
      <br />
      <button onClick={handleSave} disabled={saving || entry.trim() === ""}>
        {saving ? "Saving..." : "Save Entry"}
      </button>
    </div>
  );
}