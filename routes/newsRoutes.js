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

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const query = "delete from news where id=?";
  connection.query(query, [id], (err) => {
    if (err) throw err;

    res.redirect("/news");
  });
  connection.query("ALTER TABLE news AUTO_INCREMENT = 1;");
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const selectQuery = "SELECT * FROM news WHERE id = ?";
  connection.query(selectQuery, [id], (err, results) => {
    if (err) throw err;
    res.render("editNews", { news: results[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, photourl, articlelink, date } = req.body;
  const updateQuery =
    "UPDATE news SET title=?, description=?, photourl=?, articlelink=?, date=? WHERE id = ?";
  connection.query(
    updateQuery,
    [title, description, photourl, articlelink, date, id],
    (err, results) => {
      if (err) throw err;
      res.redirect("/news");
    }
  );
});

module.exports = router;
