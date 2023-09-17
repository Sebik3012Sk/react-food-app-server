const singleApiData = require("express").Router();
const database = require("../database/connection");

// Single recipe api
singleApiData.get("/api-data-single/:id", (req, res) => {

  // Get id from url param
  const { id } = req.params;

  // Make query
  const query = "SELECT * FROM recipes WHERE id = (?)";

  // Add values
  const values = [id];

  // Do query with query and values
  database.query(query, [values], (error, data) => {

    // If there is any error, return error as json
    if (error) {
      return res.json(error);
    }

    // If no error, return data as jsno
    return res.json(data);
  });
});

module.exports = singleApiData;
