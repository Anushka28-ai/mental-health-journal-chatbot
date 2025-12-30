"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <h1 style={styles.title}>
          🐋 AIRA
        </h1>
        <p style={styles.subtitle}>
          Your calm space to talk, reflect, and heal.
        </p>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button
            style={styles.primaryBtn}
            onClick={() => router.push("/chat")}
          >
            Talk to AIRA
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => router.push("/journal")}
          >
            Write in Journal
          </button>
        </div>

        {/* Footer text */}
        <p style={styles.footer}>
          Private • Gentle • Always here
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #dbeafe, #eef2ff)",
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "50px 40px",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    maxWidth: "420px",
    width: "100%",
  },
  title: {
    fontSize: "40px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#475569",
    marginBottom: "35px",
    lineHeight: "1.6",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  primaryBtn: {
    padding: "14px",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  secondaryBtn: {
    padding: "14px",
    borderRadius: "10px",
    background: "#f1f5f9",
    color: "#1e293b",
    fontSize: "16px",
    border: "1px solid #cbd5f5",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  footer: {
    marginTop: "30px",
    fontSize: "13px",
    color: "#64748b",
  },
};
