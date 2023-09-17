const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

const apiData = require("./routes/apiData");
const addRecipe = require("./routes/addRecipe");
const registerUser = require("./routes/registerUser");
const test = require("./routes/test");
const singleApiData = require("./routes/singleApiData");
const loginUser = require("./routes/loginUser");
const logoutUser = require("./routes/logoutUser");

const corsOptions = {
  origin: "http://localhost:5173", // <- change for your or it wont work
  credentials: true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser())

app.use("/", apiData);
app.use("/", singleApiData);
app.use("/", addRecipe);
app.use("/", registerUser);
app.use("/", loginUser)
app.use("/", logoutUser)
app.use("/", test);

app.get("/", (req, res) => {
  // res.render("index");
});

// app.get("*", (req, res) => {
//   res.send("<h1>Error 404 Not Found</h1>");
// });

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server is running on port ${PORT}`);
});
