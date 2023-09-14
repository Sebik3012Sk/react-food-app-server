const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

const apiData = require("./routes/apiData");
const addRecipe = require("./routes/addRecipe");
const registerUser = require("./routes/registerUser");
const test = require("./routes/test");

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());

app.use("/", apiData);
app.use("/", addRecipe);
app.use("/", registerUser);
app.use("/", test);

app.get("/", (req, res) => {
  // res.render("index");
});

app.get("*", (req, res) => {
  res.send("<h1>Error 404 Not Found</h1>");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server is running on port ${PORT}`);
});
