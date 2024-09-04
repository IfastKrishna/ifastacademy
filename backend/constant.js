require("dotenv").config();
const PORT = process.env.PORT || 8080;
const DB_NAME = "ifastacademy";

module.exports = { PORT, DB_NAME };
