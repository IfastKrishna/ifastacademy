const express = require("express");
const isAuth = require("../../middlewares/isAuth.middleware");
const getFollowupModes = require("../../controllers/master/follow-up-mode/get-followup-mode.controller");
const addFollowupMode = require("../../controllers/master/follow-up-mode/add-followup-mode.controller");
const getFollowupModeById = require("../../controllers/master/follow-up-mode/get-followup-mode-by-id");
const updateFollowupMode = require("../../controllers/master/follow-up-mode/update-followup-mode.controller");
const deleteFollowupMode = require("../../controllers/master/follow-up-mode/delete-followup-mode.controller");
const getFollowupModesCount = require("../../controllers/master/follow-up-mode/get-folloup-mode-count.controller");
const FollowupModeRouter = express.Router();

FollowupModeRouter.get("/all", isAuth(), getFollowupModes);

FollowupModeRouter.post(
  "/",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  addFollowupMode
);

FollowupModeRouter.get("/:id", isAuth(), getFollowupModeById);

FollowupModeRouter.patch(
  "/:id",
  isAuth(["admin", "staff", "teacher", "superadmin"]),
  updateFollowupMode
);

FollowupModeRouter.get("/all/count", isAuth(), getFollowupModesCount);

FollowupModeRouter.delete(
  "/:id",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  deleteFollowupMode
);

module.exports = FollowupModeRouter;
