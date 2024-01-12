const express = require("express");
const router = express.Router();
const connection = require("../utils/database");
const formatDate = require("../utils/formatDate");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM contactus", (err, results) => {
    if (err) throw err;
    console.log(results);
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      res.send(results);
    } else {
      res.render("indexContactUs", { contactus: results });
    }
  });
});

router.post("/add", (req, res) => {
  const { name, email, message } = req.body;
  const insertQuery =
    "INSERT INTO contactus (name, email, message, date) VALUES (?, ?, ?, ?)";
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  connection.query(
    insertQuery,
    [name, email, message, currentDate],
    (err, results) => {
      if (err) throw err;
      res.redirect("/contactus");
    }
  );
});

module.exports = router;
