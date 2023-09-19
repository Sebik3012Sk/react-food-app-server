const jwt = require("jsonwebtoken")

const verify = (req, res, next) => {
    const header = req.headers.authorization

    console.log("Header", header)
    // console.log("Header", header)
    if (!header) {
        return res.status(401).json("Not authenticated.")

    }
    const token = header.split(" ")[1]
    jwt.verify(token, process.env.KEY, (error, data) => {
        if (error) {
            return res.status(403).json("Token is not valid.")
        }
        next()
    })
}

module.exports = verify