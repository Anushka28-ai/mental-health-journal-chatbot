import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Mental Health App</h1>

      <ul>
        <li>
          <Link href="/chat">Chat with Support Bot</Link>
        </li>
        <li>
          <Link href="/journal">Write Journal</Link>
        </li>
      </ul>
    </div>
  );
}
