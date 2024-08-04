// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const AllRouters = require("./routes/AllRoutes");

// const app = express();
// console.log(process.env.CLINT_URL);

// app.use(
//   cors({
//     origin: process.env.CLINT_URL,
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());
// app.use("/api/v1", AllRouters);
// // // http://localhost:8080/api/v1 baseurl

// module.exports = app;

require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AllRouters = require("./routes/AllRoutes");

const app = express();
const corsOptions = {
  origin: ["http://localhost:3030"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
aap.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1", AllRouters);
// // http://localhost:8080/api/v1 baseurl

module.exports = app;
