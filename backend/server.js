const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AllRouters = require("./routes/AllRoutes");

const app = express();

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1", AllRouters);
// // http://localhost:8080/api/v1 baseurl

module.exports = app;
