const User = require("../../models/user.models");

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  return res
    .status(200)
    .json({ message: "User found", data: user, isAuth: true });
};

module.exports = getCurrentUser;
