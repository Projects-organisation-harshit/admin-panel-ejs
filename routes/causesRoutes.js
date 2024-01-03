const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM causes", (err, results) => {
    if (err) throw err;
    console.log(results);
    res.render("indexCauses", { causes: results });
  });
});

router.post("/add", (req, res) => {
  const { title, description, raised_money, goal, photourl } = req.body;
  const insertQuery = `INSERT INTO causes (title, description,raised_money, goal, photourl) VALUES (?, ?, ? , ?,?)`;
  connection.query(
    insertQuery,
    [title, description, raised_money, goal, photourl],
    (err, results) => {
      if (err) throw err;
      res.redirect("/causes");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const userId = req.params.id;
  const deleteQuery = "DELETE FROM causes WHERE id = ?";

  connection.query(deleteQuery, [userId], (err, results) => {
    if (err) throw err;
    res.redirect("/causes");
  });
  connection.query("ALTER TABLE causes AUTO_INCREMENT = 1;");
});

router.get("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const selectQuery = "SELECT * FROM causes WHERE id = ?";
  connection.query(selectQuery, [userId], (err, results) => {
    if (err) throw err;
    res.render("editCauses", { causes: results[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const Id = req.params.id;
  const { title, description, raised_money, goal, photourl } = req.body;
  const updateQuery =
    "UPDATE causes SET title = ?, description=?,raised_money = ?, goal = ?, photourl = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [title, description, raised_money, goal, photourl, Id],
    (err, results) => {
      if (err) throw err;
      res.redirect("/causes");
    }
  );
});

module.exports = router;
