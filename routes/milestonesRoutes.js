const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM milestones", (err, results) => {
    if (err) throw err;
    // console.log(results);
    console.log(req.headers.accept);
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      res.send(results);
    } else {
      res.render("indexMilestones", { data: results });
    }
  });
});

router.post("/add", (req, res) => {
  const { year, title, photourl, description } = req.body;
  const insertQuery = `INSERT INTO milestones (year, title, photourl, description) VALUES (?, ?, ? , ?)`;
  connection.query(
    insertQuery,
    [year, title, photourl, description],
    (err, results) => {
      if (err) throw err;
      res.redirect("/milestones");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const eventId = req.params.id;
  const deleteQuery = "DELETE FROM milestones WHERE id = ?";

  connection.query(deleteQuery, [eventId], (err, results) => {
    if (err) throw err;
    res.redirect("/milestones");
  });
  connection.query("ALTER TABLE milestones AUTO_INCREMENT = 1;");
});

router.get("/edit/:id", (req, res) => {
  const eventId = req.params.id;
  const selectQuery = "SELECT * FROM milestones WHERE id = ?";
  connection.query(selectQuery, [eventId], (err, results) => {
    if (err) throw err;
    res.render("editMilestones", { milestone: results[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const eventId = req.params.id;
  const { year, title, photourl, description } = req.body;
  const updateQuery =
    "UPDATE milestones SET year = ?, title = ?, photourl = ?, description = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [year, title, photourl, description, eventId],
    (err, results) => {
      if (err) throw err;
      res.redirect("/milestones");
    }
  );
});

module.exports = router;
