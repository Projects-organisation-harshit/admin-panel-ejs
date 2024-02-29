const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "database-1.czw6qum40gpe.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "ngo",
});

module.exports = connection;
