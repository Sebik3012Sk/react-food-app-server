const logoutUser = require("express").Router()

// Logout user api
logoutUser.get("/logout-user", (req, res) => {
    
    // Clear cookies and send 200 status with success message
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
})

module.exports = logoutUser