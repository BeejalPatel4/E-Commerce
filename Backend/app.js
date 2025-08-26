const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const fileuplode = require("express-fileupload");


//new Routes
const userRoute = require("./Routes/user");
const categoryRoute = require("./Routes/category");
const ProductRoute = require("./Routes/product");
const CartRoute = require("./Routes/cart");
const checkoutRoute = require("./Routes/checkout");
const orderRoute = require("./Routes/order");
const ConnectRoute =require("./Routes/Contect");



app.use(cors());
// 
// Express.js backend example:
app.use(express.static("Upload"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use(fileuplode());

 
// new

app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", ProductRoute);
app.use("/api", CartRoute);
app.use("/api", checkoutRoute);
app.use("/api", orderRoute);
app.use("/api",ConnectRoute);
// app.use(cors());

const ConnectionURL = "mongodb://localhost:27017/uniqc";
const MyCon = async () => {
  try {
    await mongoose
      .connect(ConnectionURL)
      .then(console.log("Successfully Connect Db."))
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

MyCon();

const port = process.env.PORT; // environment variables for port configuration
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
