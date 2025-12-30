"use client";

import React, { useState } from "react";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<string[]>([]);
  const [mood, setMood] = useState("Happy");

  const saveEntry = () => {
    if (!entry.trim()) return;

    const fullEntry = `${mood} — ${entry}`;
    setEntries((prev) => [...prev, fullEntry]);
    setEntry("");
    setMood("Happy");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 Your Private Journal</h2>

      <label style={styles.label}>Mood</label>
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={styles.select}
      >
        <option>Happy</option>
        <option>Neutral</option>
        <option>Sad</option>
        <option>Anxious</option>
        <option>Angry</option>
      </select>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write freely… this space is just for you 🌱"
        style={styles.textarea}
      />

      <button style={styles.saveBtn} onClick={saveEntry}>
        Save Entry
      </button>

      {/* Saved entries */}
      <div style={{ marginTop: 24 }}>
        {entries.map((e, i) => (
          <div key={i} style={styles.entryCard}>
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 680,
    margin: "40px auto",
    padding: 20,
    background: "#eef2ff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center" as const,
    marginBottom: 20,
    color: "#1f2937",
  },
  label: {
  fontWeight: "600",
  color: "#374151",
  marginBottom: 6,
  display: "block",
},

  select: {
    width: "100%",
    padding: 10,
    marginBottom: 14,
    borderRadius: 8,
  },
 textarea: {
  width: "100%",
  minHeight: 160,
  padding: 12,
  borderRadius: 10,
  border: "1px solid #c7d2fe",
  fontSize: 15,
  color: "#111827",
  background: "#ffffff",
},

  saveBtn: {
    marginTop: 12,
    padding: "10px 18px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
 entryCard: {
  background: "#ffffff",
  padding: 14,
  borderRadius: 12,
  marginTop: 12,
  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
  color: "#1f2937",
  fontSize: "15px",
  lineHeight: "1.6",
},

