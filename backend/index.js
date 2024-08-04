const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const app = require("./server.js");
const { PORT } = require("./constant.js");
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT || PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
