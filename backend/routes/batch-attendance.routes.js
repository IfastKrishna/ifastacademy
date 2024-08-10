const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const getTotalAttendanceByDate = require("../controllers/batch-attendance/get-total-report-today");
const takeBatchAttendance = require("../controllers/batch-attendance/add-attendance");
const getBatchAttendance = require("../controllers/batch-attendance/get-datewise-batch-report");
const BatchAttendanceRouter = express.Router();

BatchAttendanceRouter.post("/", isAuth(), takeBatchAttendance);
BatchAttendanceRouter.get("/get/:_id", isAuth(), getTotalAttendanceByDate);
BatchAttendanceRouter.get("/attendance", isAuth(), getBatchAttendance);
BatchAttendanceRouter.delete("/delete/:_id", isAuth());

module.exports = BatchAttendanceRouter;
