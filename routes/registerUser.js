const registerUser = require("express").Router();
const { createConnection } = require("mysql");

const database = createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "react-recipes-db"
})

registerUser.post("/register-user",(req,res) => {

    const { email , password } = req.body;

    const sql_query = `INSERT INTO users (\`id\`, \`email\`, \`password\`) VALUES ('id','${email}', '${password}')`
    database.query(sql_query,(err,result,fields) => {
        if(err) {
            return console.log(err);
        }

        return result;
    })
})

module.exports = registerUser;