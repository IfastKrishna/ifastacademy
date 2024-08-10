const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const getAllFollowups = require("../controllers/folloup/get-all-followup.controller");
const FollowupRouter = express.Router();

FollowupRouter.get(
  "/all",
  isAuth(["superadmin", "admin", "teacher"]),
  getAllFollowups
);

module.exports = FollowupRouter;
