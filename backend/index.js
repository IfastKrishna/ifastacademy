require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const { PORT: port } = require("./constant.js");
const AllRouters = require("./routes/index.js");
const PORT = port || 8080;
const app = express();

const corsOptions = {
  origin: process.env.CLINT_URL.split(","),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public", "dist")));
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

app.use("/api/v1", AllRouters);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT || PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
