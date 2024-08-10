const { Employee } = require("../../../models/master/employee.models");

const getEmployees = async (req, res) => {
  let { page = 1, limit = 10, search = "", joTitle = "" } = req.query;
  search = new RegExp(search, "i");

  try {
    const query = {
      $or: [
        { firstName: search },
        { lastName: search },
        { email: search },
        { phoneNo: search },
        { ifastId: search },
      ],
    };

    if (joTitle) {
      query.jobTitle = joTitle;
    }

    const [users, count] = await Promise.all([
      Employee.find(query)
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit)),
      Employee.countDocuments(query),
    ]);

    return res.status(200).json({
      message: "Employee found",
      totalCount: count,
      data: users,
      isAuth: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getEmployees;
