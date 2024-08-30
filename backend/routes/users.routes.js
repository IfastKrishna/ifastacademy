const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const login = require("../controllers/user/login.controller");
const logout = require("../controllers/user/logout.controller");
const createUser = require("../controllers/user/create-user.controller");
const userRegister = require("../middlewares/user/user-register.middleware");
const getCurrentUser = require("../controllers/user/get-current.controller");
const changeCurrentPassword = require("../controllers/user/change-password.controller");
const getAllUsers = require("../controllers/user/get-all.controller");
const { getNextIfastId } = require("../controllers/user/get-next-ifast-id");
const countUsersWithBirthdayToday = require("../controllers/user/getTodayBirthdays");
const userBlockUnblock = require("../controllers/user/blockUnblock");
const getUserByRole = require("../controllers/user/get-user-by-role");
const updateUserProfile = require("../controllers/user/update-profile");
const UserRouter = express.Router();

UserRouter.post("/", userRegister, createUser);
UserRouter.get("/roles/:role", getUserByRole);
UserRouter.patch("/:id", isAuth(["admin", "superadmin"]), userBlockUnblock);
UserRouter.post("/login", login);
UserRouter.post("/logout", isAuth(), logout);
UserRouter.get("/me", isAuth(), getCurrentUser);

UserRouter.patch("/change-password", isAuth(), changeCurrentPassword);
UserRouter.patch("/update-profile/:id", isAuth(), updateUserProfile);

UserRouter.get("/all", isAuth(["admin", "superadmin"]), getAllUsers);
UserRouter.get("/get-next-ifast-id", isAuth(), getNextIfastId);
UserRouter.get(
  "/get-today-birthdays-count",
  isAuth(),
  countUsersWithBirthdayToday
);

module.exports = UserRouter;
