const apiData = require("express").Router();
const database = require("../database/connection");

// const database = createConnection({
//   host: "localhost",
//   user: "root",
//   database: "react-recipes-db",
//   password: "",
//   connectionLimit: 10,
// });

// apiData.get("/api-data",(req,res) => {
//     database.query("SELECT * FROM `recipes`",(err,result,fields) => {
//         if(err) {
//             return console.log(err);
//         }

//         return res.json(result);
//     })
// })

// Get all recipes from database
apiData.get("/api-data", (req, res) => {

  // Make query
  const query = "SELECT * FROM recipes";
  database.query(query, (error, data) => {

    // If there is any error return error as json
    if (error) {
      return res.json(error);
    }

    // If no error, return data as json
    return res.json(data);
  });
});

module.exports = apiData;
