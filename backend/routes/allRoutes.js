const express = require("express");
const UserRouter = require("./users.routes");
const StudentRouter = require("./students.routes");
const FollowupRouter = require("./followup.routes");
const { Employee } = require("../models/master/employee.models");
const BatchRouter = require("./master/batches.routes");
const LeadSourceRouter = require("./master/lead-sources.routes");
const FollowupModeRouter = require("./master/followup-modes.routes");
const CourseRouter = require("./master/courses.routes");
const AllRouters = express.Router();

AllRouters.use("/user", UserRouter);
AllRouters.use("/student", StudentRouter);
AllRouters.use("/followup", FollowupRouter);
AllRouters.use("/master/employee", Employee);
AllRouters.use("/master/batch", BatchRouter);
AllRouters.use("/master/lead-source", LeadSourceRouter);
AllRouters.use("/master/flowup-mode", FollowupModeRouter);
AllRouters.use("/master/course", CourseRouter);

module.exports = AllRouters;
