import express from "express";
import cors from "cors";
import userRoute from "./router/user.router";
import cateRoute from "./router/category.router";
import subCategory from "./router/subCategory.router";
import productRoute from "./router/product.router";
import cartRoute from "./router/cart.router";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const Port = 5000;

app.use(cors());
var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/user", userRoute);
app.use("/category",cateRoute);
app.use("/subCategory",subCategory);
app.use("/products",productRoute);
app.use("/cart" , cartRoute)

mongoose
  .connect("mongodb+srv://worktrycatch:oDB5vzO6xTGP75q0@cluster0.afvkinp.mongodb.net/e-commerce")
  .then(() => {
    console.log("mongodb started");
  })
  .catch(() => {
    console.log("mongodb connection error");
});

app.listen(Port, function () {
  console.log(`Example app listening on port ${Port}!`);
});
