const { Employee } = require("../../../models/master/employee.models");

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      data: employee,
      message: "Employee fetched successfully",
      success: true,
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = getEmployeeById;
