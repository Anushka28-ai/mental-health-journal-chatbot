"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async () => {
    if (!message) return;

    setMessages((prev) => [...prev, "You: " + message]);

    try {
      const res = await fetch("https://mental-health-journal-chatbot.onrender.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Sia",
          message: message,
        }),
      });

      const data = await res.json();

      // 👇 THIS is important
     setMessages((prev) => [...prev, "Bot: " + data.reply]);
      setMessage("");
    } catch (error) {
      setMessages((prev) => [...prev, "Bot: Backend not responding"]);
    }
  };

    const sendEmoji = async (emoji: string) => {
    setMessages((prev) => [...prev, "You: " + emoji]);

    try {
      const res = await fetch("https://mental-health-journal-chatbot.onrender.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Sia",
          message: emoji,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, "Bot: " + data.data.botReply]);
    } catch (error) {
      setMessages((prev) => [...prev, "Bot: Backend not responding"]);
    }
  };


  return (
    <div style={{ padding: 20 }}>
      <h2>Chat with Support Bot</h2>

      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

            <div style={{ margin: "10px 0" }}>
        <button onClick={() => sendEmoji("😃")}>😃</button>
        <button onClick={() => sendEmoji("🙂")}>🙂</button>
        <button onClick={() => sendEmoji("😐")}>😐</button>
        <button onClick={() => sendEmoji("😔")}>😔</button>
        <button onClick={() => sendEmoji("😣")}>😣</button>
      </div>


      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type how you feel..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

