const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM events", (err, results) => {
    if (err) throw err;
    console.log(results);
    res.render("index", { data: results });
  });
});

router.post("/add", (req, res) => {
  const { title, description, address, city, date } = req.body;
  const insertQuery = `INSERT INTO events (title, description, address, city, date) VALUES (?, ?, ? , ?, ? )`;
  connection.query(
    insertQuery,
    [title, description, address, city, date],
    (err, results) => {
      if (err) throw err;
      res.redirect("/events");
    }
  );
});
module.exports = router;
