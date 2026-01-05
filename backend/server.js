import express from "express";
import cors from "cors";
import routes from "../backend/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("SafePass Backend is running");
});

app.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});
