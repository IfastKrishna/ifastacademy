const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const getBatchAttendance = require("../controllers/batch-attendance/get-attendance");
const getBatchAttendanceById = require("../controllers/batch-attendance/get-attendance-byid");
const addBatchAttendance = require("../controllers/batch-attendance/add-attendance");
const deleteAttendance = require("../controllers/batch-attendance/delete-attendance");
const BatchAttendanceRouter = express.Router();

BatchAttendanceRouter.get("/get", isAuth(), getBatchAttendance);
BatchAttendanceRouter.get("/get/:_id", isAuth(), getBatchAttendanceById);
BatchAttendanceRouter.post("/update/:_id", isAuth(), addBatchAttendance);
BatchAttendanceRouter.delete("/delete/:_id", isAuth(), deleteAttendance);

module.exports = BatchAttendanceRouter;
