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

router.get("/delete/:id", (req, res) => {
  const userId = req.params.id;
  const deleteQuery = "DELETE FROM events WHERE id = ?";
  connection.query(deleteQuery, [userId], (err, results) => {
    if (err) throw err;
    res.redirect("/events");
  });
});

router.get("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const selectQuery = "SELECT * FROM events WHERE id = ?";
  connection.query(selectQuery, [userId], (err, results) => {
    if (err) throw err;
    res.render("edit", { event: results[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const eventId = req.params.id;
  const { title, description, address, city, date } = req.body;
  const updateQuery =
    "UPDATE events SET title = ?, description = ?, address = ?, city = ?, date = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [title, description, address, city, date, eventId],
    (err, results) => {
      if (err) throw err;
      res.redirect("/events");
    }
  );
});

module.exports = router;
