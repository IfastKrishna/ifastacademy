const express = require("express");
const addStudent = require("../controllers/student/register.controller");
const isAuth = require("../middlewares/isAuth.middleware");
const userRegister = require("../middlewares/user/user-register.middleware");
const getStudentDetailsById = require("../controllers/student/get-from-id.controller");
const updateStudentDetails = require("../controllers/student/update-details.controller");
const downloadAllStudents = require("../controllers/student/download-all.controller");
const uploadBulk = require("../controllers/student/upload-bulk.controller");
const deleteStudent = require("../controllers/student/delete.controller");
const getStudentsCount = require("../controllers/student/get-students-count.controller");
const getAllStudents = require("../controllers/student/get-students.controller");
const addStudentFee = require("../controllers/student-fee/add-studentfee");
const getAllStudentFee = require("../controllers/student-fee/get-all-studentfee");
const getStudentFeeById = require("../controllers/student-fee/get-studentfee-byid");
const {
  getStudentPaidFees,
  getStudentUnpaidFees,
  getTotalAbsentDaysBatchWise,
  getStudentBatches,
  getStudentCurrMonthAttendance,
  getStudentAttendanceReport,
} = require("../controllers/student/student.controller");
const StudentRouter = express.Router();

StudentRouter.get(
  "/all",
  isAuth(["admin", "superadmin", "employee"]),
  getAllStudents
);

StudentRouter.post(
  "/",
  isAuth(["admin", "superadmin", "employee"]),
  userRegister,
  addStudent
);
// report for routes
StudentRouter.get(
  "/get-total-paid-fee/:studentId",
  isAuth(),
  getStudentPaidFees
);

StudentRouter.get(
  "/get-total-un-paid-fee/:studentId",
  isAuth(),
  getStudentUnpaidFees
);

StudentRouter.get(
  "/get-absent-days/:studentId",
  isAuth(),
  getTotalAbsentDaysBatchWise
);

StudentRouter.get(
  "/get-batches-attendance/:studentId",
  isAuth(),
  getStudentCurrMonthAttendance
);

StudentRouter.get(
  "/get-attendance-report/:studentId",
  isAuth(),
  getStudentAttendanceReport
);

// end of report routes

StudentRouter.get("/my-batches", isAuth(), getStudentBatches);

StudentRouter.get(
  "/:id",
  isAuth(["admin", "superadmin", "employee"]),
  getStudentDetailsById
);

StudentRouter.patch(
  "/:id",
  isAuth(["admin", "superadmin", "employee", "student"]),
  updateStudentDetails
);

StudentRouter.get(
  "/download-all",
  isAuth(["admin", "superadmin", "employee"]),
  downloadAllStudents
);

StudentRouter.post(
  "/upload-bulk",
  isAuth(["admin", "superadmin", "employee"]),
  uploadBulk
);

StudentRouter.get("/all/count", isAuth(), getStudentsCount);
StudentRouter.delete("/delete", isAuth(["admin", "superadmin"]), deleteStudent);

// now here from next feed we will add the routes for the student
StudentRouter.get(
  "/fee/all",
  isAuth(["admin", "superadmin", "employee"]),
  getAllStudentFee
);

StudentRouter.post(
  "/fee",
  isAuth(["admin", "superadmin", "employee"]),
  addStudentFee
);

StudentRouter.get("/fee/:id", isAuth(), getStudentFeeById);

// StudentRouter.patch("/fee/:id", isAuth(["admin", "superadmin", "employee"]));

// StudentRouter.delete("/student/fee/:id", isAuth());
// StudentRouter.get("/student/fee/collect-today", isAuth());
// StudentRouter.get("/student/fee/collect-all", isAuth());
// StudentRouter.get("/student/fee/pending", isAuth());

module.exports = StudentRouter;
