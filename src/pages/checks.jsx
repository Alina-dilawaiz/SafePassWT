import React, { useEffect, useState } from "react";



export default function Checks() {
  const [cnic, setCnic] = useState("");
  const [regVisitors, setRegVisitors] = useState([]);
  const [activeVisitors, setActiveVisitors] = useState([]);
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const rv = JSON.parse(localStorage.getItem("regVisitors")) || [];
    const av = JSON.parse(localStorage.getItem("activeVisitors")) || [];
    const lg = JSON.parse(localStorage.getItem("logs")) || [];
    setRegVisitors(rv);
    setActiveVisitors(av);
    setLogs(lg);
  }, []);

  function saveAll(newReg = regVisitors, newActive = activeVisitors, newLogs = logs) {
    localStorage.setItem("regVisitors", JSON.stringify(newReg));
    localStorage.setItem("activeVisitors", JSON.stringify(newActive));
    localStorage.setItem("logs", JSON.stringify(newLogs));
  }

  function checkIn() {
  fetch("/api/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Visitor Name", // later from DB
      cnic
    })
  })
    .then(res => res.json())
    .then(data => setMessage(data.message));
} 

  function checkOut() {
  fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cnic })
  })
    .then(res => res.json())
    .then(data => setMessage(data.message));
} 

  return (
    <>
      <header className="navbar">
        <h1>SafePass</h1>
        <nav>
          <a href="/home.jsx">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/checks.jsx">Check In/Out</a>
          <a href="/logs">Logs</a>
        </nav>
      </header>

    <div id="check" className="admin">
      <div className="check-wrapper">
        <h2>Check In / Check Out</h2>
        <input
          type="text"
          id="checkcnic"
          placeholder="Enter CNIC"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
        />

        <div className="button-group">
          <button className="button" onClick={checkIn}>
            Check In
          </button>
          <button className="button" onClick={checkOut}>
            Check Out
          </button>
        </div>

        <p id="log">{message}</p>
      </div>
    </div>
    <footer className="footer">
        <p>© 2025 SafePass. All rights reserved.</p>
      </footer>
    </>
  );
}
