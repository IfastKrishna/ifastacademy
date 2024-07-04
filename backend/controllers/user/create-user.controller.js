const User = require("../../models/user.models");
const handleErrors = require("../../utils/handleErrors");

const createUser = async (req, res) => {
  try {
    const user = req.user;

    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = createUser;
