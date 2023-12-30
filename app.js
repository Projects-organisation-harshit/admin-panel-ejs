const bodyParser = require("body-parser");
const express = require("express");
const connection = require("./utils/database");
const eventsRoutes = require("./routes/eventsRoutes");
const homeRoutes = require("./routes/homeRoutes");
const newsRoutes = require("./routes/newsRoutes");
const app = express();

connection.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//routes
app.use("/news", newsRoutes);
app.use("/events", eventsRoutes);
app.use("/", homeRoutes);

app.listen(8000, () => {
  console.log("app running on port 8000");
});
