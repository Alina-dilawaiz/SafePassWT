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


app.get("/", (req, res) => {
  res.send("SafePass Backend is running smoothly!");
});

// IMPORTANT: Uncomment this so the server actually runs
app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});