import { useEffect, useState } from "react";
import "../logs.css";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(storedLogs);
  }, []);

  return (
    <>
      
      <header className="navbar">
        <h1>SafePass</h1>
        <nav>
          <a href="/">Home</a>
          
          <a href="/logs">Logs</a>
        </nav>
      </header>

    
      <section id="logs" className="admin">
        <h2>Visitor Logs</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>CNIC</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5">No logs available</td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.name}</td>
                  <td>{log.cnic}</td>
                  <td>{log.checkIn}</td>
                  <td>{log.checkOut}</td>
                  <td>
                    {log.status === "in" ? "Checked-In" : "Checked-Out"}
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
