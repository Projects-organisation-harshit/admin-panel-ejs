const express = require("express");
const router = express.Router();
const connection = require("../utils/database");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    console.log(results);
    res.render("indexUsers", { users: results });
  });
});

router.post("/register", async (req, res) => {
  const {
    username,
    email,
    full_name,
    address,
    city,
    state,
    pin_code,
    phone_number,
    password,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const insertQuery = `INSERT INTO users (username, email, full_name, address, city, state, pin_code, phone_number,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    insertQuery,
    [
      username,
      email,
      full_name,
      address,
      city,
      state,
      pin_code,
      phone_number,
      hashedPassword,
    ],
    (err, results) => {
      if (err) throw err;
      res.redirect("/user");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const userId = req.params.id;
  const deleteQuery = "DELETE FROM users WHERE user_id = ?";

  connection.query(deleteQuery, [userId], (err, results) => {
    if (err) throw err;
    res.redirect("/user");
  });
  connection.query("ALTER TABLE users AUTO_INCREMENT = 1;");
});

router.get("/edit/:id", (req, res) => {
  const userId = req.params.id;
  const selectQuery = "SELECT * FROM users WHERE user_id = ?";
  connection.query(selectQuery, [userId], (err, results) => {
    if (err) throw err;
    res.render("editUsers", { user: results[0] });
  });
});

router.post("/update/:id", async (req, res) => {
  const userId = req.params.id;
  const {
    username,
    email,
    full_name,
    address,
    city,
    state,
    pin_code,
    phone_number,
    password,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const updateQuery =
    "UPDATE users SET username = ?, email = ?, full_name = ?, address = ?, city = ?, state = ?, pin_code = ?, phone_number = ?, password = ? WHERE user_id = ?";
  connection.query(
    updateQuery,
    [
      username,
      email,
      full_name,
      address,
      city,
      state,
      pin_code,
      phone_number,
      hashedPassword,
      userId,
    ],
    (err, results) => {
      if (err) throw err;
      res.redirect("/user");
    }
  );
});

router.post("/login", (req, res) => {});

module.exports = router;
