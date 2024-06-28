const User = require("../../models/user.models");

const userRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password, role, ifastId } =
      req.body;

    if ([firstName, email, phone, password, role].some((field) => !field)) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists with this email or phone number",
      });
    }

    const userCount = await User.countDocuments({});
    const formattedUserCount =
      userCount < 10
        ? `000${userCount}`
        : userCount < 100
        ? `00${userCount}`
        : userCount < 1000
        ? `0${userCount}`
        : userCount.toString();

    const newIfastId = !ifastId
      ? `IFAST/${new Date().getFullYear()}/${formattedUserCount}`
      : ifastId;

    const user = await User.create({
      firstName,
      lastName,
      ifastId: newIfastId,
      email,
      phone,
      password,
      role,
    });

    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );

    req.user = userWithoutPassword;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userRegister;
