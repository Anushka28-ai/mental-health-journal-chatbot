"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>💙 Mental Health Support Bot</h2>

        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                background:
                  msg.sender === "user"
                    ? "linear-gradient(135deg, #2563eb, #1e40af)"
                    : "#e5e7eb",
                color: msg.sender === "user" ? "#fff" : "#000",
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
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
          <button
            style={styles.sendBtn}
            onClick={() => sendMessage(message)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #c7d2fe, #e0e7ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    backdropFilter: "blur(10px)",
  },
  heading: {
    textAlign: "center" as const,
    marginBottom: "15px",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    height: "300px",
    overflowY: "auto" as const,
    padding: "10px",
    borderRadius: "12px",
    background: "#f8fafc",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "18px",
    maxWidth: "75%",
    fontSize: "14px",
  },
  emojiRow: {
    display: "flex",
    justifyContent: "space-around",
    margin: "12px 0",
  },
  emojiBtn: {
    fontSize: "22px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  inputRow: {
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #c7d2fe",
    outline: "none",
  },
  sendBtn: {
    padding: "10px 16px",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
