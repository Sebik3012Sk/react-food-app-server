const loginUser = require("express").Router()
const database = require("../database/connection")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Login user api
loginUser.post("/login-user", (req, res) => {

    // Check if user exist, make query
    const query = "SELECT * FROM users WHERE email = (?)"
    database.query(query, [req.body.email], (error, data) => {

        // If there is error, return error as json
        if (error) {
            return res.json(error)
        }
        
        // If length of data is 0, user is not in database, return status 404(not found)
        if (data.length === 0) {
            return res.status(404).json("User not found")
        }

        //Compare passwords
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        // Check if passwords match
        if (!isPasswordCorrect) {
            return res.status(400).json("Passwords do not match.")
        }

        // Separate password from other data (never ever send password to client)
        const {password, ...other} = data[0]

        // Create jsonwebtoken
        const token = jwt.sign({id: data[0].id, admin: data[0].admin}, process.env.KEY)

        // Set cookie
        res.cookie("access_token", token).status(200).json(other)
    })
})

module.exports = loginUser