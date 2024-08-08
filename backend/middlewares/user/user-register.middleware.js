const User = require("../../models/user.models");

const userRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNo, role, ifastId, ...rest } =
      req.body;

    if ([firstName, email, phoneNo, role].some((field) => !field)) {
      return res
        .status(400)
        .send({ message: "Please fill all required fields" });
    }

    // Email and phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!phoneRegex.test(phoneNo)) {
      return res.status(400).json({
        message: "Invalid phone number format. Phone number must be 10 digits.",
      });
    }

    const userExists = await User.findOne({ $and: [{ email }, { phoneNo }] });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists with this email or phone number",
      });
    }

    const userCount = (await User.countDocuments({})) + 1;
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
      phoneNo,
      password: phoneNo,
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
