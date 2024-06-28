const User = require("../models/user.models");

const isAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies[process.env.TOKEN_NAME] ||
      req.headers("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return handleUnauthorized(res);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?._id).select("-password");

    if (!user) {
      return handleUnauthorized(res);
    }

    const { role } = user;
    if (role !== "admin" && role !== "superadmin") {
      return handleUnauthorized(
        res,
        "You are not authorized to access this route"
      );
    }
jghfvhfgiiuiu0gyhjhikjjl
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUnauthorized = (res, message = "Unauthorized request") => {
  res
    .status(401)
    .cookie(process.env.TOKEN_NAME, null, { expires: new Date(Date.now()) })
    .clearCookie(process.env.TOKEN_NAME)
    .json({ success: false, message: message });
};

module.exports = isAdmin;
