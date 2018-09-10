var express = require("express");
var app = express();
var mongoose = require("mongoose");
var router = require("./router");
var postRouter = require("./postRouter");
var category = require("./categoryRouter");
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/ppldata");
app.use("/post", postRouter);
app.use("/", router);
app.use("/category", category);
app.use(express.static("public"));
app.listen(2007, () => {
  console.log("start");
});
