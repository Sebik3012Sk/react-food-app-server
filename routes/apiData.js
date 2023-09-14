const apiData = require("express").Router();
const { createConnection } = require("mysql");

const database = createConnection({
  host: "localhost",
  user: "root",
  database: "react-recipes-db",
  password: "",
  connectionLimit: 10,
});

// apiData.get("/api-data",(req,res) => {
//     database.query("SELECT * FROM `recipes`",(err,result,fields) => {
//         if(err) {
//             return console.log(err);
//         }

//         return res.json(result);
//     })
// })

apiData.get("/api-data", (req, res) => {
  const query = "SELECT * FROM recipes";
  database.query(query, (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json(data);
  });
});

module.exports = apiData;
