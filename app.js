const bodyParser = require("body-parser");
const express = require("express");
const connection = require("./utils/database");
const eventsRoutes = require("./routes/eventsRoutes");
const app = express();

connection.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});

//routes
app.use("/events", eventsRoutes);
app.use("/", (req, res) => {
  console.log("home");

  res.send("home");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(8000, () => {
  console.log("app running on port 8000");
});
