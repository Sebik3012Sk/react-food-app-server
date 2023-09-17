const postDatadb = require("express").Router();
const multer = require("multer");
const database = require("../database/connection");
const path = require("path");

// const database = createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "react-recipes-db",
// });

// postDatadb.post("/post-datadb",(req,res) => {
//     const { title , image , recipe_text } = req.body;
//     const database = createConnection({
//         host : "localhost",
//         user : "root",
//         password : "",
//         database : "react-recipes-db"
//     })

//     console.log(title);

//     const sqlQuery = `INSERT INTO recipes (\`title\`, \`image\`, \`id\`, \`recipe_text\`) VALUES ('${title}', '${image}', 'id', '${recipe_text}')`;

//     database.query(sqlQuery,(err,result,fields) => {
//         if(err) {
//             return console.log(err);
//         }

//         console.log(result);
//     })
// })

// Define storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  // Add original name to uploaded image
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload recipe to database
postDatadb.post("/post-datadb", upload.single("image"), (req, res) => {

  // Make query
  const query ="INSERT INTO recipes (`title`, `image`, `recipe_text`) VALUES (?)";

  // Add values
  const values = [req.body.title, req.file.filename, req.body.recipeText];

  // Do query with query and values
  database.query(query, [values], (error, data) => {

    // If there is any error, return error as json
    if (error) {
      return res.json(error);
    }

    // If no error, return data as json
    return res.json(data);
  });
});

module.exports = postDatadb;
