const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("indexHome");
});

module.exports = router;
