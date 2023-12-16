const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const urlRoute = require("./routes/urls")

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api/auth",authRoute);
app.use("/api/urls",urlRoute);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB Connection Successful");
})
.catch((err) => {
    console.log(err.message)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
})

