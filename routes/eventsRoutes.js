const express = require("express");
const router = express.Router();
const connection = require("../utils/database");
const formatDate = require("../utils/formatDate");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM events", (err, results) => {
    if (err) throw err;
    console.log(results);
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      res.send(results);
    } else {
      res.render("indexEvent", { data: results });
    }
    // res.send(results);
  });
});

router.get("/latest", (req, res) => {
  connection.query(
    "SELECT * FROM events ORDER BY date ASC LIMIT 1;",
    (err, results) => {
      if (err) throw err;
      console.log(results);
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        res.send(results);
      } else {
        res.render("indexEvent", { data: results });
      }
      // res.send(results);
    }
  );
});

router.post("/add", (req, res) => {
  const { title, description, address, city, state, date, photo_url } =
    req.body;
  const insertQuery = `INSERT INTO events (title, description, address, city, state,date,photo_url) VALUES (?, ?, ? , ?, ? , ?, ?)`;
  connection.query(
    insertQuery,
    [title, description, address, city, state, date, photo_url],
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
  connection.query("ALTER TABLE events AUTO_INCREMENT = 1;");
});

router.get("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const selectQuery = "SELECT * FROM events WHERE id = ?";
  connection.query(selectQuery, [userId], (err, results) => {
    if (err) throw err;

    const formattedResults = results.map((result) => {
      return {
        ...result,
        date: formatDate(result.date),
      };
    });

    res.render("editEvent", { event: formattedResults[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const eventId = req.params.id;
  const { title, description, address, city, state, date, photo_url } =
    req.body;

  const updateQuery =
    "UPDATE events SET title = ?, description = ?, address = ?, city = ?, state = ?,date = ? , photo_url=? WHERE id = ?";
  connection.query(
    updateQuery,
    [title, description, address, city, state, date, photo_url, eventId],
    (err, results) => {
      if (err) throw err;
      res.redirect("/events");
    }
  );
});

module.exports = router;
