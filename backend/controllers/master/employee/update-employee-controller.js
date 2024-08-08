const { Employee } = require("../../../models/master/employee.models");
const handleErrors = require("../../../utils/handleErrors");

const updateEmployee = async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      userId,
      email,
      jobTitle,
      startDate,
      address,
      ...rest
    } = req.body;

    // Validate required fields
    if (
      !id ||
      !firstName ||
      !lastName ||
      !userId ||
      !email ||
      !jobTitle ||
      !startDate ||
      !address
    ) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Additional email validation (optional)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // Additional jobTitle validation (optional)
    if (!["teacher", "staff"].includes(jobTitle)) {
      return res.status(400).json({
        message: "Invalid job title! (allowed values: teacher, staff)",
      });
    }

    const updateData = {
      firstName,
      lastName,
      userId,
      email,
      jobTitle,
      startDate,
      address,
      ...rest,
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = updateEmployee;
