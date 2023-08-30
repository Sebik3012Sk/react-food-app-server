const { createConnection } = require("mysql");
const postDatadb = require("express").Router();


postDatadb.post("/post-datadb",(req,res) => {
    const { title , image , recipe_text } = req.body;
    const database = createConnection({
        host : "localhost",
        user : "root",
        password : "",
        database : "react-recipes-db"
    })

    console.log(title);

    const sqlQuery = `INSERT INTO recipes (\`title\`, \`image\`, \`id\`, \`recipe_text\`) VALUES ('${title}', '${image}', 'id', '${recipe_text}')`;

    database.query(sqlQuery,(err,result,fields) => {
        if(err) {
            return console.log(err);
        }

        console.log(result);
    })
})

module.exports = postDatadb;