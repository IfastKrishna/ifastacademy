const User = require("../../models/user.models");

const getAllUsers = async (req, res) => {
  let { page = 1, limit = 10, search = "" } = req.query;
  search = search.replace(/[^a-zA-Z0-9]/g, "\\$&");
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

    const [users, count] = await Promise.all([
      User.find(query)
        .select("-password")
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit)),
      User.countDocuments(query),
    ]);

    if (users.length === 0) {
      return res.status(400).json({ message: "No user found" });
    }

    return res.status(200).json({
      message: "Users found",
      totalCount: count,
      data: users,
      isAuth: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllUsers;
