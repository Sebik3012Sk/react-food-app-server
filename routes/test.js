const test = require("express").Router();

test.get("/test-api",(req,res) => {
    res.json({
        message : "Hello"
    })
})

module.exports = test;