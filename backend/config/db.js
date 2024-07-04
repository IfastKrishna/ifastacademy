const mongoose = require("mongoose");
const { DB_NAME } = require("../constant");

const connectDB = async () => {
  try {
    const mongoResponse = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("mongodb connected host :: ", mongoResponse.connection.host);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
