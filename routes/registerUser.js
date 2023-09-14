const registerUser = require("express").Router();
const { createConnection } = require("mysql");

const database = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react-recipes-db",
});

// registerUser.post("/register-user", (req, res) => {
//   const { email, password } = req.body;
//   console.log("email", email);
//   console.log("password", password);

//   const sql_query = `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`;
//   database.query(sql_query, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     }

//     console.log(fields);
//   });
// });

registerUser.post("/register-user", (req, res) => {
  const query = "INSERT INTO users (`email`, `password`) VALUES (?)";
  const values = [req.body.email, req.body.password];

  // req.body.password - treba zahashovat heslo

  database.query(query, [values], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json("User has been added successfully.");
  });
});

module.exports = registerUser;
