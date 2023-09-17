const { createConnection } = require("mysql");
require("dotenv").config();

// Create database connection
const database = createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Do connection to database
database.connect((error) => {

  // If there is any error, console log error and return error
  if (error) {
    console.log("error", error);
    return error;
  }

  // If no error, just continue
  console.log("Connected to db.");
});

module.exports = database;
