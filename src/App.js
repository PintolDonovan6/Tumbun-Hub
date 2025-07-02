import React, { useState } from "react";

function App() {
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getAISuggestion() {
    setLoading(true);
    setError("");
    setAiSuggestion("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Your prompt here" }),
      });
      const data = await response.json();
      if (response.ok) {
        setAiSuggestion(data.result);
      } else {
        setError(data.error || "Failed to get AI suggestion");
      }
    } catch (err) {
      setError(err.message || "Fetch error");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Tumbuna Hub Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <p><strong>Followers:</strong> 4,580</p>
        <p><strong>Engagement Rate:</strong> 15%</p>
        <p><strong>Reach:</strong> 18,300</p>
      </div>

      <button onClick={getAISuggestion} disabled={loading} style={{ padding: "10px 20px", fontSize: 16 }}>
        {loading ? "Loading AI Suggestion..." : "Get AI Suggestion"}
      </button>

      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}

      {aiSuggestion && (
        <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc", borderRadius: 5, backgroundColor: "#f9f9f9" }}>
          <h3>AI Suggestion:</h3>
          <p>{aiSuggestion}</p>
        </div>
      )}
    </div>
  );
}

export default App;
