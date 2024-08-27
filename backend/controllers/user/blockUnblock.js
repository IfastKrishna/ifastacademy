const User = require("../../models/user.models");

const userBlockUnblock = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    req.user.role == "admin" && user.role == "superadmin"
      ? res.status(403).json({
          message: "You are not authorized to block/unblock this user",
        })
      : null;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndUpdate(id, { status: !user.status });

    if (user.status) {
      return res.status(200).json({ message: "User blocked successfully" });
    }
    return res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    handleErrors;
  }
};

module.exports = userBlockUnblock;
