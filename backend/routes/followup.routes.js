const express = require("express");
const getAllFollowups = require("../controllers/folloup/get-all-followup");
const isAuth = require("../middlewares/isAuth.middleware");
const FollowupRouter = express.Router();

FollowupRouter.get(
  "/all",
  isAuth(["superadmin", "admin", "teacher"]),
  getAllFollowups
);

module.exports = FollowupRouter;
