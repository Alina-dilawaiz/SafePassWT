import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "safepass"
});

db.connect(err => {
  if (err) {
    console.error(" MySQL error:", err);
  } else {
    console.log(" MySQL Connected");
  }
});

export default db;
