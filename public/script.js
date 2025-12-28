const journalBtn = document.getElementById("journalBtn");
const moodSelect = document.getElementById("mood");
const journalNote = document.getElementById("journalNote");
const journalHistory = document.getElementById("journalHistory");

// Save journal entry
journalBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const mood = moodSelect.value;
  const note = journalNote.value.trim();

  if (!name) {
    alert("Please enter your name");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mood, note })
    });

    const data = await res.json();
    if (data.success) {
      alert("Journal entry saved!");
      journalNote.value = "";
      loadJournal();
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Load journal entries
async function loadJournal() {
  const res = await fetch("http://localhost:5000/journal");
  const data = await res.json();

  if (data.success) {
    journalHistory.innerHTML = "";
    data.data.forEach(entry => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${entry.name} (${new Date(entry.createdAt).toLocaleString()}):</strong> Mood: ${entry.mood} ${entry.note ? "| Note: " + entry.note : ""}`;
      journalHistory.appendChild(div);
    });
  }
}

// Load journal on page load
loadJournal();
