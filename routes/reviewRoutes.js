// reviewsRoute.js
const express = require("express");
const router = express.Router();
const connection = require("../utils/database");
const formatDate = require("../utils/formatDate");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM reviews", (err, results) => {
    connection.query("select id from team_members", (err, Eresults) => {
      if (err) throw err;
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        res.send(results);
      } else {
        res.render("indexreviews", { reviewsData: results, eData: Eresults });
      }
    });
  });
});

router.get("/joined", (req, res) => {
  const query = `
  SELECT reviews.*, team_members.*,team_members.id as employee_id
  FROM reviews
  LEFT JOIN team_members ON reviews.employee_id = team_members.id
`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log(results);
  });
});

router.post("/add", (req, res) => {
  const { employee_id, review_text, review_date } = req.body;
  const insertQuery = `INSERT INTO reviews (employee_id, review_text, review_date) VALUES (?, ?, ?)`;

  connection.query(
    insertQuery,
    [employee_id, review_text, review_date],
    (err, results) => {
      if (err) throw err;
      res.redirect("/reviews");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const reviewId = req.params.id;
  const deleteQuery = "DELETE FROM reviews WHERE review_id = ?";

  connection.query(deleteQuery, [reviewId], (err, results) => {
    if (err) throw err;
    res.redirect("/reviews");
  });
});

router.get("/edit/:id", (req, res) => {
  const reviewId = req.params.id;
  const selectQuery = "SELECT * FROM reviews WHERE review_id = ?";

  connection.query(selectQuery, [reviewId], (err, results) => {
    if (err) throw err;
    const formattedResults = results.map((result) => {
      return {
        ...result,
        review_date: formatDate(result.review_date),
      };
    });
    res.render("editReview", { review: formattedResults[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const reviewId = req.params.id;
  const { employee_id, review_text, review_date } = req.body;
  const updateQuery =
    "UPDATE reviews SET employee_id = ?, review_text = ?, review_date = ? WHERE review_id = ?";

  connection.query(
    updateQuery,
    [employee_id, review_text, review_date, reviewId],
    (err, results) => {
      if (err) throw err;
      res.redirect("/reviews");
    }
  );
});

module.exports = router;
