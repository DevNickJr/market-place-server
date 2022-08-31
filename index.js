const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");


// constants
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const auth = require("./routes/auth");
const cart = require("./routes/cart");
const order = require("./routes/order");
const product = require("./routes/product");
const user = require("./routes/user");


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("connected to DB");
}

//middlewares
app.use(morgan("tiny"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

//routes
app.use("/api/auth", auth);
// app.use("/api/cart", cart);
// app.use("/api/order", order);
// app.use("/api/product", product);
// app.use("/api/user", user);


app.listen(PORT, () => {
    console.log(`SERVER ACTIVE on PORT ${PORT}`);
})