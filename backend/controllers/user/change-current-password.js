const User = require("../../models/user.models");

const changeCurrentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isMatch = await user.isPasswordCorrect(oldPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password doesn't match" });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = changeCurrentPassword;
