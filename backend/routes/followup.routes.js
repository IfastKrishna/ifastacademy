const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const getAllFollowups = require("../controllers/folloup/get-all-followup.controller");
const {
  addFollowUp,
  deleteFollowUp,
  rescheduleFollowUp,
  deleteAllFollowUps,
  getFollowupById,
  getAllFollowUpsByCollectionOrId,
  updateFollowUp,
} = require("../controllers/folloup/followup.controller");
const FollowupRouter = express.Router();

FollowupRouter.get(
  "/all",
  isAuth(["superadmin", "admin", "employee"]),
  getAllFollowups
);

FollowupRouter.post(
  "/",
  isAuth(["superadmin", "admin", "employee"]),
  addFollowUp
);

FollowupRouter.patch(
  "/:id",
  isAuth(["superadmin", "admin", "employee"]),
  updateFollowUp
);

FollowupRouter.patch(
  "/reschedule/:id",
  isAuth(["superadmin", "admin", "employee"]),
  rescheduleFollowUp
);

FollowupRouter.delete(
  "/:id",
  isAuth(["superadmin", "admin", "employee"]),
  deleteFollowUp
);

FollowupRouter.get("/:id", isAuth(), getFollowupById);
FollowupRouter.get("/all/user", isAuth(), getAllFollowUpsByCollectionOrId);
FollowupRouter.delete("/all", isAuth(["superadmin"]), deleteAllFollowUps);

module.exports = FollowupRouter;
