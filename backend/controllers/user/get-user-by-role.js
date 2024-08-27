const { Employee } = require("../../models/master/employee.models");
const { Student } = require("../../models/student/student.models");
const User = require("../../models/user.models");

const getUserByRole = async (req, res) => {
  const { role } = req.params;
  console.log(role);
  try {
    const { role } = req.params;
    const roles = role.split(",");

    const users = await Promise.all(
      roles.map(async (r) => {
        if (r === "employee") {
          const employees = await Employee.find({}).select(
            "-_id firstName lastName ifastId userId"
          );
          return employees.length
            ? employees.map((employee) => ({
                ...employee._doc,
                role: "employee",
              }))
            : null;
        } else {
          const users = await User.find({ role: r }).select("-password").exec();
          return users.length
            ? users.map((user) => ({ ...user._doc, role: "user" }))
            : null;
        }
      })
    );

    const filteredUsers = users.flat().filter((user) => user !== null);

    res.send({ data: filteredUsers, message: "Users fetched successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = getUserByRole;
