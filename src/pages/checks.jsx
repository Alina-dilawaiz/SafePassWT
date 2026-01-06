import React, { useEffect, useState } from "react";
import "../checks.css";
import { Link } from "react-router-dom";


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
  fetch("http://localhost:5000/api/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Visitor", // later from register page
      cnic
    })
  })
    .then(res => res.json())
    .then(data => setMessage(data.message));
}
  function checkOut() {
  fetch("http://localhost:5000/api/checkout", {
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
  <Link to="/">Home</Link>
  <Link to="/checks">Check In/Out</Link>
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/logs">Logs</Link>
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
