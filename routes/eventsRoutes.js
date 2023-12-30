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

module.exports = router;
