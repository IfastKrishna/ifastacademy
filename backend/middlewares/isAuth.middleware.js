const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const handleErrors = require("../utils/handleErrors");

const isAuth = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const token =
        req.cookies[process.env.TOKEN_NAME] ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return handleUnauthorized(res);
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded?._id).select("-password");

      if (!user) {
        return handleUnauthorized(res);
      }

      const { role } = user;

      // If requiredRoles is empty, allow any logged-in user
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return handleUnauthorized(
          res,
          "You are not authorized to access this route"
        );
      }

      // console.log(user, "user");
      req.user = user;
      next();
    } catch (error) {
      handleErrors(error, res);
    }
  };
};

const handleUnauthorized = (res, message = "Unauthorized request") => {
  res
    .status(401)
    .cookie(process.env.TOKEN_NAME, null, { expires: new Date(Date.now()) })
    .clearCookie(process.env.TOKEN_NAME)
    .json({ success: false, message: message });
};

module.exports = isAuth;
