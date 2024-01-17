const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM help", (err, results) => {
    if (err) throw err;
    // console.log(results);
    console.log(req.headers.accept);
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      res.send(results);
    } else {
      res.render("indexhelp", { helpData: results });
    }
  });
});

router.post("/add", (req, res) => {
  const { heading, photo_url, description } = req.body;
  const insertQuery = `INSERT INTO help ( title, photourl, descr) VALUES (?, ? , ?)`;
  connection.query(
    insertQuery,
    [heading, photo_url, description],
    (err, results) => {
      if (err) throw err;
      res.redirect("/help");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const eventId = req.params.id;
  const deleteQuery = "DELETE FROM help WHERE id = ?";

  connection.query(deleteQuery, [eventId], (err, results) => {
    if (err) throw err;
    res.redirect("/help");
  });
  connection.query("ALTER TABLE help AUTO_INCREMENT = 1;");
});

router.get("/edit/:id", (req, res) => {
  const eventId = req.params.id;
  const selectQuery = "SELECT * FROM help WHERE id = ?";
  connection.query(selectQuery, [eventId], (err, results) => {
    if (err) throw err;
    res.render("edithelp", { help: results[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const Id = req.params.id;
  const { title, photourl, descr } = req.body;
  const updateQuery =
    "UPDATE help SET  title = ?, photourl = ?, descr = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [title, photourl, descr, Id],
    (err, results) => {
      if (err) throw err;
      res.redirect("/help");
    }
  );
});

module.exports = router;
