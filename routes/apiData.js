const apiData = require("express").Router();
const { createConnection } = require("mysql");

const database = createConnection({
    host : "localhost",
    user : "root",
    database : "react-recipes-db",
    password : "",
    connectionLimit : 10
})

apiData.get("/api-data",(req,res) => {
    database.query("SELECT * FROM `recipes`",(err,result,fields) => {
        if(err) {
            return console.log(err);
        }

        return res.json(result);
    })
})

module.exports = apiData;