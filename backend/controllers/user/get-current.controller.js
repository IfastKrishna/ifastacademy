const { Employee } = require("../../models/master/employee.models");
const { Student } = require("../../models/student/student.models");
const User = require("../../models/user.models");

const getCurrentUser = async (req, res) => {
  let user;

  if (req?.user?.role === "student") {
    user = await Student.findOne({ userId: req?.user?._id });
    user = { ...user?._doc, role: "student" };
  } else if (req?.user?.role === "employee") {
    user = await Employee.findOne({ userId: req?.user?._id });
    user = { ...user?._doc, role: "employee" };
  } else {
    user = await User.findById(req.user._id).select("-password");
  }
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  return res
    .status(200)
    .json({ message: "User found", data: user, isAuth: true });
};

module.exports = getCurrentUser;
