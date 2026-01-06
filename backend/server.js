const express = require("express");
const cors = require("cors");
const db = require("./db"); // IMPORTANT: Import your database connection

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
    const { name, cnic, phone } = req.body;
    
    // 1. Generate the token BEFORE the query
    const qr_token = `VISITOR-${Date.now()}-${cnic}`;

    // 2. Add qr_token to the SQL query and the values array
    const sql = "INSERT INTO visitors (name, cnic, phone, qr_token) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [name, cnic, phone, qr_token], (err, result) => {
        if (err) {
            console.error(err);
            // This will now catch actual database errors
            return res.status(500).json({ message: "Database Error" });
        }

        // 3. Send success response
        res.status(200).json({ 
            message: "Visitor registered successfully", 
            qr_token: qr_token 
        });
    });
});

// CHECK-IN ROUTE
app.post("/api/checkin", (req, res) => {
  const { cnic } = req.body;
  // Check if visitor exists
  db.query("SELECT id FROM visitors WHERE cnic = ?", [cnic], (err, results) => {
    if (results.length === 0) return res.status(404).json({ message: "Visitor not registered!" });

    const visitorId = results[0].id;
    // Check if already checked in
    db.query("SELECT id FROM logs WHERE visitor_id = ? AND status = 'in'", [visitorId], (err, logRes) => {
      if (logRes.length > 0) return res.status(400).json({ message: "Visitor already checked in!" });

      db.query("INSERT INTO logs (visitor_id, status, check_in_time) VALUES (?, 'in', NOW())", [visitorId], (err) => {
        res.json({ message: "Checked in successfully!" });
      });
    });
  });
});

// CHECK-OUT ROUTE
app.post("/api/checkout", (req, res) => {
  const { cnic } = req.body;
  db.query("SELECT id FROM visitors WHERE cnic = ?", [cnic], (err, results) => {
    if (results.length === 0) return res.status(404).json({ message: "Visitor not found!" });

    const visitorId = results[0].id;
    // Find the 'in' status to update it to 'out'
    db.query("UPDATE logs SET status = 'out', check_out_time = NOW() WHERE visitor_id = ? AND status = 'in'", [visitorId], (err, updateRes) => {
      if (updateRes.affectedRows === 0) return res.status(400).json({ message: "Visitor was not checked in!" });
      res.json({ message: "Checked out successfully!" });
    });
  });
});


app.get('/api/stats', (req, res) => {
    const totalSql = "SELECT COUNT(*) AS total FROM visitors";
    const activeSql = "SELECT COUNT(*) AS active FROM logs WHERE status = 'in'";
    const completedSql = "SELECT COUNT(*) AS completed FROM logs WHERE status = 'out'";

    db.query(totalSql, (err, totalResult) => {
        if (err) return res.status(500).json({ message: "Error fetching total registrations" });

        db.query(activeSql, (err, activeResult) => {
            if (err) return res.status(500).json({ message: "Error fetching active visitors" });

            db.query(completedSql, (err, completedResult) => {
                if (err) return res.status(500).json({ message: "Error fetching completed visits" });

                res.json({
                    totalRegistrations: totalResult[0].total,
                    activeVisitors: activeResult[0].active,
                    completedVisits: completedResult[0].completed
                });
            });
        });
    });
});

app.get("/api/logs", (req, res) => {
    // We join 'logs' with 'visitors' to get names and CNICs
    const sql = `
        SELECT v.name, v.cnic, l.status, l.check_in_time, l.check_out_time 
        FROM logs l 
        JOIN visitors v ON l.visitor_id = v.id 
        ORDER BY l.check_in_time DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// IMPORTANT: Uncomment this so the server actually runs
app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});