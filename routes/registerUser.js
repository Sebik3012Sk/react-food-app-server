const registerUser = require("express").Router();
const database = require("../database/connection");
const bcrypt = require("bcryptjs")

// Register user route
registerUser.post("/register-user", (req, res) => {

  // Check if user already exist
  const query = "SELECT * FROM users WHERE email = ?"
  database.query(query, [req.body.email], (error, data) => {
    if (error) {
      return res.json(error)
    }
    if (data.length) {
      return res.status(409).json("User allready exist.")
    }

    // If youser does not exist create new user
    // Hash password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    // Insert user to db
    const query = "INSERT INTO users (`email`, `password`) VALUES (?)";
    const values = [req.body.email, hash]
    database.query(query, [values], (error, data) => {

      // If error show error
      if (error) {
        return res.json(error)
      }

      // If no error than send message
      return res.status(200).json("User has been created.")
    })
  })
});

module.exports = registerUser;
