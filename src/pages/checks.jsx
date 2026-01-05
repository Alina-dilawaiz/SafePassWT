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
    if (!cnic) {
      alert("Enter CNIC");
      return;
    }

    const visitor = regVisitors.find((v) => v.cnic === cnic);

    if (!visitor) {
      alert("Visitor not registered!");
      return;
    }

    if (activeVisitors.includes(cnic)) {
      alert("Already checked in");
      return;
    }

    const newActive = [...activeVisitors, cnic];

    const newLogEntry = {
      name: visitor.name,
      cnic,
      checkIn: new Date().toLocaleString(),
      checkOut: "-",
      status: "in",
    };

    const newLogs = [...logs, newLogEntry];

    setActiveVisitors(newActive);
    setLogs(newLogs);
    saveAll(regVisitors, newActive, newLogs);

    setMessage(`${visitor.name} checked in successfully!`);
  }

  function checkOut() {
    if (!cnic) {
      alert("Enter CNIC");
      return;
    }

    if (!activeVisitors.includes(cnic)) {
      alert("Visitor not checked in");
      return;
    }

    const newActive = activeVisitors.filter((v) => v !== cnic);

    // find the most recent 'in' log for this cnic (search from end)
    const idx = (() => {
      for (let i = logs.length - 1; i >= 0; i--) {
        if (logs[i].cnic === cnic && logs[i].status === "in") return i;
      }
      return -1;
    })();

    const newLogs = [...logs];
    if (idx !== -1) {
      newLogs[idx] = {
        ...newLogs[idx],
        checkOut: new Date().toLocaleString(),
        status: "out",
      };
    }

    setActiveVisitors(newActive);
    setLogs(newLogs);
    saveAll(regVisitors, newActive, newLogs);

    setMessage("Checked out successfully!");
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
