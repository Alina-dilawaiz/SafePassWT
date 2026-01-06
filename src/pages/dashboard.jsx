import React, { useState, useEffect } from "react";
import "../dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeVisitors: 0,
    totalRegistrations: 0,
    completedVisits: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <>
    <header className="navbar">
        <h1>SafePass</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/checks">Check In/Out</Link>
          <Link to="/logs">Logs</Link>
        </nav>

      </header> 
    <section id="dashboard" class="admin">
      <h2 style={{ textAlign: "center" }}>Security Dashboard</h2>
      
      <div className="card-container">
        <div className="card">
          <h3>Active Visitors</h3>
          <span>{stats.activeVisitors}</span>
        </div>

        <div className="card">
          <h3>Total Registrations</h3>
          <span>{stats.totalRegistrations}</span>
        </div>

        <div className="card">
          <h3>Completed Visits</h3>
          <span>{stats.completedVisits}</span>
        </div>
      </div>
    </section>
    <footer className="footer">
        <p>© 2025 SafePass. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Dashboard;