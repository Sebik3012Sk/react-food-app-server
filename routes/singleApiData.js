const singleApiData = require("express").Router();
const database = require("../database/connection");

singleApiData.get("/api-data-single/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM recipes WHERE id = (?)";
  const values = [id];

  database.query(query, [values], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json(data);
  });
});

module.exports = singleApiData;
