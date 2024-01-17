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
const contactusRoutes = require("./routes/contactRoutes");
const helpRoutes = require("./routes/helpRoutes");
const donationsRoutes = require("./routes/donationRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

connection.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: "strict", secure: false },
  })
);
//routes
app.use("/donations", donationsRoutes);
app.use("/contactus", contactusRoutes);
app.use("/user", userRoutes);
app.use("/milestones", milestonesRoutes);
app.use("/team_members", teamRoutes);
app.use("/causes", causesRoutes);
app.use("/news", newsRoutes);
app.use("/events", eventsRoutes);
app.use("/help", helpRoutes);
app.use("/", homeRoutes);
app.use("*", (req, res) => {
  res.render("404");
});

app.listen(8000, () => {
  console.log("app running on port 8000");
});
