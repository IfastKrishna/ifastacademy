const express = require("express");
const addStudent = require("../controllers/student/register.controller");
const getStudent = require("../controllers/student/get-students.controller");
const isAuth = require("../middlewares/isAuth.middleware");
const userRegister = require("../middlewares/user/user-register.middleware");
const getStudentDetailsById = require("../controllers/student/get-from-id.controller");
const updateStudentDetails = require("../controllers/student/update-details.controller");
const downloadAllStudents = require("../controllers/student/download-all.controller");
const uploadBulk = require("../controllers/student/upload-bulk.controller");
const deleteStudent = require("../controllers/student/delete.controller");
const StudentRouter = express.Router();

StudentRouter.post(
  "/",
  isAuth(["admin", "superadmin", "employee"]),
  userRegister,
  addStudent
);

StudentRouter.get(
  "/all",
  isAuth(["admin", "superadmin", "employee"]),

  getStudent
);

StudentRouter.get(
  "/:id",
  isAuth(["admin", "superadmin", "employee", "student"]),
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

StudentRouter.delete("/delete", isAuth(["admin", "superadmin"]), deleteStudent);

module.exports = StudentRouter;
