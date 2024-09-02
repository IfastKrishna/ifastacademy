const express = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const getTotalAttendanceByDate = require("../controllers/batch-attendance/get-total-report-today");
const takeBatchAttendance = require("../controllers/batch-attendance/add-attendance");
const getBatchAttendanceByDateAndId = require("../controllers/batch-attendance/get-datewise-batch-report");
const updateAndCreateBatchAttendance = require("../controllers/batch-attendance/update-attendance");
const getBatchAndDateWiseAttendance = require("../controllers/batch-attendance/get-date-batch-wise-attendance");
const BatchAttendanceRouter = express.Router();

BatchAttendanceRouter.post("/", isAuth(), takeBatchAttendance);
BatchAttendanceRouter.get("/get/:_id", isAuth(), getTotalAttendanceByDate);
BatchAttendanceRouter.get(
  "/attendance",
  isAuth(),
  getBatchAttendanceByDateAndId
);
BatchAttendanceRouter.patch(
  "/create-update",
  isAuth(),
  updateAndCreateBatchAttendance
);

BatchAttendanceRouter.get(
  "/batch-date-wise-attendance",
  isAuth(),
  getBatchAndDateWiseAttendance
);

// BatchAttendanceRouter.delete("/delete/:_id", isAuth());

module.exports = BatchAttendanceRouter;
