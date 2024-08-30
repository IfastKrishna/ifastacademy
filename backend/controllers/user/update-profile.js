const { Employee } = require("../../models/master/employee.models");
const { Student } = require("../../models/student/student.models");
const User = require("../../models/user.models");
const handleErrors = require("../../utils/handleErrors");

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !req?.body?.role) {
      throw new Error("User ID and role are required.");
    }

    let updatedUser;

    const address = {
      city: req.body.city,
      country: req.body.country,
      state: req.body.state,
      streetAddress: req.body.streetAddress,
      postalCode: req.body.postalCode,
    };

    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      ...(req.body?.role !== "user" && { address }),
    };

    if (req.body?.role === "student") {
      updatedUser = await Student.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedUser) throw new Error("Student not found.");
    } else if (req.body?.role === "employee") {
      updatedUser = await Employee.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedUser) throw new Error("Employee not found.");
    } else {
      updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedUser) throw new Error("User not found.");
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
    } else {
      handleErrors(error, res);
    }
  }
};

module.exports = updateUserProfile;
