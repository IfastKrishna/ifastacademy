const addEmployee = async (req, res) => {
  try {
    // Destructure required fields from request body
    const {
      firstName,
      lastName,
      userId,
      email,
      jobTitle,
      startDate,
      address, // assuming address is required
    } = req.body;

    // Validate required fields
    if (
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

    // Create and save new employee (assuming address validation is handled by the schema)
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (err) {
    handleErrors(err, res); // Handle validation and other errors
  }
};
