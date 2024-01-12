const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM Donations", (err, results) => {
    if (err) throw err;
    console.log(results);
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      res.send(results);
    } else {
      res.render("indexDonations", { data: results });
    }
  });
});

router.post("/add", (req, res) => {
  const { username, amount, donation_date } = req.body;
  const insertQuery = `INSERT INTO Donations (username, amount, donation_date) VALUES (?, ?, ?)`;
  connection.query(
    insertQuery,
    [username, amount, donation_date],
    (err, results) => {
      if (err) throw err;
      res.redirect("/donations");
    }
  );
});

module.exports = router;
