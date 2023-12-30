const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
  const sqlQuery = "select * from news";
  connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.render("indexNews.ejs", { news: results });
  });
});

router.post("/add", (req, res) => {
  const { title, description, photourl, articlelink, date } = req.body;
  const sqlQuery =
    "insert into news (title, description, photourl, articlelink, date) values (?,?,?,?,?);";

  connection.query(
    sqlQuery,
    [title, description, photourl, articlelink, date],
    (err) => {
      if (err) throw err;
      res.redirect("/news");
    }
  );
});

module.exports = router;
