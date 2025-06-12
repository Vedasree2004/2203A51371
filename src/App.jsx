import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [numberId, setNumberId] = useState("p"); // default: 'p' for prime
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNumbers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/numbers/${numberId}`);
      if (!res.ok) throw new Error("Invalid response from server.");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Failed to fetch from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>

      <label>Select Number Type:</label>
      <select value={numberId} onChange={(e) => setNumberId(e.target.value)}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>

      <button onClick={fetchNumbers}>Fetch Numbers</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          <h2>Response</h2>
          <p><strong>Previous Window:</strong> {JSON.stringify(data.windowPrevState)}</p>
          <p><strong>Current Window:</strong> {JSON.stringify(data.windowCurrState)}</p>
          <p><strong>New Numbers:</strong> {JSON.stringify(data.numbers)}</p>
          <p><strong>Average:</strong> {data.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
