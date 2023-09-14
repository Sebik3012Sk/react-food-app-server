const { createConnection } = require("mysql");
require("dotenv").config();

const database = createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

database.connect((error) => {
  if (error) {
    console.log("error", error);
    return error;
  }
  console.log("Connected to db.");
});

module.exports = database;
