const registerUser = require("express").Router();
const database = require("../database/connection");
const bcrypt = require("bcryptjs")

// Register user api
registerUser.post("/register-user", (req, res) => {

  // Check if user already exist, make query
  const query = "SELECT * FROM users WHERE email = ?"
  database.query(query, [req.body.email], (error, data) => {

    // If there is any error, return error as json
    if (error) {
      return res.json(error)
    }

    // If there is any length in data, user allready exist, return status 409(conflict)
    if (data.length) {
      return res.status(409).json("User allready exist.")
    }

    // If youser does not exist create new user
    // Hash password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    // Make query
    const query = "INSERT INTO users (`email`, `password`) VALUES (?)";

    // Add values to query
    const values = [req.body.email, hash]

    // Perform query
    database.query(query, [values], (error, data) => {

      // If there is any error, return error as json
      if (error) {
        return res.json(error)
      }

      // If no error than send status 200(ok) with message
      return res.status(200).json("User has been created.")
    })
  })
});

module.exports = registerUser;
