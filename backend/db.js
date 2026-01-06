const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "safepass"
});

db.connect(err => {
  if (err) console.error("MySQL error:", err);
  else console.log("MySQL Connected");
});

module.exports = db; // This must be module.exports to work with require()