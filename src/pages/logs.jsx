import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../logs.css";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs from backend instead of localStorage
    fetch("http://localhost:5000/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  return (
    <>
      <header className="navbar">
        <h1>SafePass</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/checks">Check In/Out</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/logs">Logs</Link>
        </nav>
      </header>

      <section id="logs" className="admin">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Visitor Logs</h2>

        <table className="logs-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>CNIC</th>
              <th>Check-In Time</th>
              <th>Check-Out Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No logs available</td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.name}</td>
                  <td>{log.cnic}</td>
                  <td>{new Date(log.check_in_time).toLocaleString()}</td>
                  <td>
                    {log.check_out_time 
                      ? new Date(log.check_out_time).toLocaleString() 
                      : "---"}
                  </td>
                  <td>
                    <span className={`status-badge ${log.status}`}>
                      {log.status === "in" ? "Active" : "Completed"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <footer className="footer">
        <p>&copy; 2025 SafePass. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Logs;