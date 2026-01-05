import express from "express";
import db from "./db.js";

const router = express.Router();


router.post("/checkin", (req, res) => {
  const { name, cnic } = req.body;

  const sql = `
    INSERT INTO logs (name, cnic, check_in, status)
    VALUES (?, ?, NOW(), 'in')
  `;

  db.query(sql, [name, cnic], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Checked in successfully" });
  });
});


router.post("/checkout", (req, res) => {
  const { cnic } = req.body;

  const sql = `
    UPDATE logs
    SET check_out = NOW(), status='out'
    WHERE cnic=? AND status='in'
    ORDER BY id DESC LIMIT 1
  `;

  db.query(sql, [cnic], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Checked out successfully" });
  });
});


router.get("/logs", (req, res) => {
  db.query("SELECT * FROM logs ORDER BY id DESC", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

export default router;
