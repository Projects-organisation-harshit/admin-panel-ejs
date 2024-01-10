const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const connection = require("./utils/database");
const eventsRoutes = require("./routes/eventsRoutes");
const homeRoutes = require("./routes/homeRoutes");
const newsRoutes = require("./routes/newsRoutes");
const causesRoutes = require("./routes/causesRoutes");
const teamRoutes = require("./routes/teamRoutes");
const milestonesRoutes = require("./routes/milestonesRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();

connection.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(session({ secret: "sectet", resave: true, saveUninitialized: true }));

//routes
app.use("/user", userRoutes);
app.use("/milestones", milestonesRoutes);
app.use("/team_members", teamRoutes);
app.use("/causes", causesRoutes);
app.use("/news", newsRoutes);
app.use("/events", eventsRoutes);
app.use("/", homeRoutes);
app.use("*", (req, res) => {
  res.render("404");
});

app.listen(8000, () => {
  console.log("app running on port 8000");
});
