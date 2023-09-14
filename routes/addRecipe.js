const { createConnection } = require("mysql");
const postDatadb = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const database = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react-recipes-db",
});

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

postDatadb.post("/post-datadb", upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  const query =
    "INSERT INTO recipes (`title`, `image`, `recipe_text`) VALUES (?)";
  const values = [req.body.title, req.file.filename, req.body.recipeText];

  database.query(query, [values], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json(data);
  });
});

module.exports = postDatadb;
