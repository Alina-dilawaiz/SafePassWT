const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/checkin", (req, res) => {
  const { cnic } = req.body;
  res.json({ message: `Checked IN successfully: ${cnic}` });
});

app.post("/api/checkout", (req, res) => {
  const { cnic } = req.body;
  res.json({ message: `Checked OUT successfully: ${cnic}` });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
