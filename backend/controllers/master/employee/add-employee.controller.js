const { Employee } = require("../../../models/master/employee.models");
const handleErrors = require("../../../utils/handleErrors");

const addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, jobTitle, joiningDate, ...rest } =
      req.body;
    const userId = req?.user?._id;
    const avatar = req?.user?.avatar;

    const address = {
      streetAddress: rest.streetAddress,
      city: rest.city,
      state: "Delhi",
      postalCode: rest.postalCode,
    };
    // Validate required fields
    const requiredFields = [
      firstName,
      userId,
      email,
      jobTitle,
      joiningDate,
      address,
    ];

    if (jobTitle === "teacher") {
      requiredFields.push(rest.enrolledBatch);
    }

    if (
      requiredFields.some(
        (field) =>
          field === undefined || field === "" || field === null || !field
      )
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

    const newEmployee = new Employee({
      ...req.body,
      address,
      avatar,
      batchIds: rest.enrolledBatch,
      userId,
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (err) {
    handleErrors(err, res);
  }
};

module.exports = addEmployee;
