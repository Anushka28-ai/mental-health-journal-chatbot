"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsTyping(true);

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

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.reply },
        ]);
        setIsTyping(false);
      }, 700);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Backend not responding 💔" },
      ]);
      setIsTyping(false);
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

        {isTyping && (
          <div style={styles.typing}>Bot is typing…</div>
        )}

        <div ref={bottomRef} />
      </div>

      <div style={styles.emojiRow}>
        {["😃", "🙂", "😐", "😔", "😣"].map((e) => (
          <button
            key={e}
            style={styles.emojiBtn}
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage(message)}
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
    maxWidth: "520px",
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
    height: "320px",
    overflowY: "auto" as const,
    padding: "14px",
    borderRadius: "14px",
    background: "#f3f4f6",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "16px",
    maxWidth: "75%",
    fontSize: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  typing: {
    fontSize: "13px",
    color: "#6b7280",
    fontStyle: "italic",
    marginLeft: "4px",
  },
  emojiRow: {
    display: "flex",
    justifyContent: "space-around",
    margin: "15px 0",
  },
  emojiBtn: {
    fontSize: "22px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.1s",
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
