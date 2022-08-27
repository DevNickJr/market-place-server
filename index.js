const express = require("express");
const app = express();
const dotenv = require("dotenv").config();


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const morgan = require("morgan");

const mongoose = require("mongoose");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("connected to DB");
}

//middlewares
app.use(morgan("tiny"))

app.get("/", (req, res) => {
    res.send("works");
})

app.listen(PORT, () => {
    console.log(`SERVER ACTIVE on PORT ${PORT}`);
})