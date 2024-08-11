const express = require("express");
const UserRouter = require("./users.routes");
const StudentRouter = require("./students.routes");
const FollowupRouter = require("./followup.routes");
const BatchRouter = require("./master/batches.routes");
const CourseRouter = require("./master/courses.routes");
const EmployeeRouter = require("./master/employees.routes");
const LeadSourceRouter = require("./master/lead-sources.routes");
const FeeCategoryRouter = require("./master/fee-category.routes");
const FollowupModeRouter = require("./master/followup-modes.routes");
const CourseEnquiryRouter = require("./course-enquires.routes");
const BatchAttendanceRouter = require("./batch-attendance.routes");
const AllRouters = express.Router();

AllRouters.use("/user", UserRouter);
AllRouters.use("/student", StudentRouter);
AllRouters.use("/followup", FollowupRouter);
AllRouters.use("/course-enquire", CourseEnquiryRouter);
AllRouters.use("/batch-attendance", BatchAttendanceRouter);
AllRouters.use("/master/batch", BatchRouter);
AllRouters.use("/master/course", CourseRouter);
AllRouters.use("/master/employee", EmployeeRouter);
AllRouters.use("/master/fee-category", FeeCategoryRouter);
AllRouters.use("/master/lead-source", LeadSourceRouter);
AllRouters.use("/master/followup-mode", FollowupModeRouter);

module.exports = AllRouters;
