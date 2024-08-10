const { Employee } = require("../../../models/master/employee.models");
const handleErrors = require("../../../utils/handleErrors");

const deleteEmployee = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    id = JSON.parse(id);
    if (Array.isArray(id)) {
      const employee = await Employee.deleteMany({ _id: { $in: id } });
      if (!employee.deletedCount) {
        return res
          .status(404)
          .json({ message: `Employee with ids ${id} not found` });
      }
      return res.json({
        message: `Employees with ids ${id} deleted successfully`,
      });
    }
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = deleteEmployee;
