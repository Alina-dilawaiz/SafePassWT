import React, { useState } from "react";
import "../checks.css";
import { Link } from "react-router-dom";

export default function Checks() {
  const [cnic, setCnic] = useState("");
  const [message, setMessage] = useState("");

  const checkIn = () => {
    if (!cnic) {
      setMessage("Please enter a CNIC");
      return;
    }

    fetch("http://localhost:5000/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cnic })
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        if (data.message.includes("success")) setCnic(""); // Clear input on success
      })
      .catch((err) => setMessage("Server error. Is the backend running?"));
  };

  const checkOut = () => {
    if (!cnic) {
      setMessage("Please enter a CNIC");
      return;
    }

    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cnic })
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        if (data.message.includes("success")) setCnic(""); // Clear input on success
      })
      .catch((err) => setMessage("Server error. Is the backend running?"));
  };

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

          <p id="log" className={message.includes("success") ? "success-msg" : "error-msg"}>
            {message}
          </p>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 SafePass. All rights reserved.</p>
      </footer>
    </>
  );
}