const User = require("../../models/user.models");
const handleErrors = require("../../utils/handleErrors");

const createUser = async (req, res) => {
  try {
    const user = req.user;
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(400).json({ message: "User not found" });
    }

    return res
      .status(201)
      .json({ message: "User created successfully", data: createdUser });
  } catch (error) {
    console.log(error.message);
    handleErrors(error, res);
  }
};

module.exports = createUser;
