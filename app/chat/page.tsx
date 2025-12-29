"use client";

import { useState, useEffect } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);

  // 🔹 Animation setup
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);

    try {
      const res = await fetch(
        "https://mental-health-journal-chatbot.onrender.com/messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Sia",
            message: text,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Backend not responding 💔" },
      ]);
    }

    setMessage("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💙 Mental Health Support Bot</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#2563eb" : "#e5e7eb",
              color: msg.sender === "user" ? "#fff" : "#000",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 😊 Emoji buttons */}
      <div style={styles.emojiRow}>
        {["😃", "🙂", "😐", "😔", "😣"].map((e) => (
          <button
            key={e}
            style={styles.emojiBtn}
            onMouseOver={(el) =>
              (el.currentTarget.style.transform = "scale(1.3)")
            }
            onMouseOut={(el) =>
              (el.currentTarget.style.transform = "scale(1)")
            }
            onClick={() => sendMessage(e)}
          >
            {e}
          </button>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type how you feel..."
        />
        <button style={styles.sendBtn} onClick={() => sendMessage(message)}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center" as const,
    marginBottom: "15px",
    color: "#1f2937",
    fontWeight: "bold",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    height: "300px",
    overflowY: "auto" as const,
    padding: "10px",
    borderRadius: "12px",
    background: "#f3f4f6",
  },
  message: {
    padding: "12px 16px",
    borderRadius: "18px",
    maxWidth: "75%",
    fontSize: "14px",
    animation: "fadeIn 0.3s ease-in",
  },
  emojiRow: {
    display: "flex",
    justifyContent: "space-around",
    margin: "15px 0",
  },
  emojiBtn: {
    fontSize: "24px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.15s ease",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  sendBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
