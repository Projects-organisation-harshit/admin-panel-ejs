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
  const { username, Amount, Donation_Date } = req.body;
  const insertQuery = `INSERT INTO Donations (username, Amount, Donation_Date) VALUES (?, ?, ?)`;
  connection.query(
    insertQuery,
    [username, Amount, Donation_Date],
    (err, results) => {
      if (err) throw err;
      res.send("done");
    }
  );
});

module.exports = router;
