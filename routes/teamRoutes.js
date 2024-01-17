const express = require("express");
const router = express.Router();
const connection = require("../utils/database");
const formatDate = require("../utils/formatDate");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM team_members", (err, results) => {
    if (err) throw err;
    // console.log(results);
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      res.send(results);
    } else {
      res.render("indexTeamMembers", { teamMembers: results });
    }
  });
});

router.post("/add", (req, res) => {
  const {
    first_name,
    last_name,
    photoUrl,
    date_of_joining,
    role,
    email,
    phone_number,
  } = req.body;
  const insertQuery = `INSERT INTO team_members (first_name, last_name, photoUrl, date_of_joining, role, email, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    insertQuery,
    [
      first_name,
      last_name,
      photoUrl,
      date_of_joining,
      role,
      email,
      phone_number,
    ],
    (err, results) => {
      if (err) throw err;
      res.redirect("/team_members");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const memberId = req.params.id;
  const deleteQuery = "DELETE FROM team_members WHERE id = ?";

  connection.query(deleteQuery, [memberId], (err, results) => {
    if (err) throw err;
    res.redirect("/team_members");
  });
  connection.query("ALTER TABLE team_members AUTO_INCREMENT = 1;");
});

router.get("/edit/:id", (req, res) => {
  const memberId = req.params.id;
  const selectQuery = "SELECT * FROM team_members WHERE id = ?";
  connection.query(selectQuery, [memberId], (err, results) => {
    if (err) throw err;
    const formattedResults = results.map((result) => {
      return {
        ...result,
        date_of_joining: formatDate(result.date_of_joining),
      };
    });

    res.render("editTeamMembers", { teamMember: formattedResults[0] });
  });
});

router.post("/update/:id", (req, res) => {
  const memberId = req.params.id;
  const {
    first_name,
    last_name,
    photoUrl,
    date_of_joining,
    role,
    email,
    phone_number,
  } = req.body;
  const updateQuery =
    "UPDATE team_members SET first_name = ?, last_name = ?, photoUrl = ?, date_of_joining = ?, role = ?, email = ?, phone_number = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [
      first_name,
      last_name,
      photoUrl,
      date_of_joining,
      role,
      email,
      phone_number,
      memberId,
    ],
    (err, results) => {
      if (err) throw err;
      res.redirect("/team_members");
    }
  );
});

module.exports = router;
