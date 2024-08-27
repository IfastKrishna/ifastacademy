const express = require("express");

const isAuth = require("../middlewares/isAuth.middleware");
const getCourseInquiries = require("../controllers/course-enquire/get-all-course-enquire.controller");
const {
  addCourseEnquire,
  getCourseEnquiresById,
  deleteAllCourseEnquires,
  updateCourseEnquire,
  getCourseEnquiresCount,
  updateCourseEnquireStatus,
  deleteCourseEnquire,
} = require("../controllers/course-enquire/course-enquire.controller");
const CourseEnquiryRouter = express.Router();

CourseEnquiryRouter.get(
  "/all",
  isAuth(["admin", "superadmin", "employee"]),
  getCourseInquiries
);

CourseEnquiryRouter.get(
  "/:id",
  isAuth(["admin", "superadmin", "employee"]),
  getCourseEnquiresById
);

CourseEnquiryRouter.get("/all/count", isAuth(), getCourseEnquiresCount);

CourseEnquiryRouter.post("/", isAuth(), addCourseEnquire);

CourseEnquiryRouter.patch(
  "/:id",
  isAuth(["admin", "superadmin", "employee"]),
  updateCourseEnquire
);

CourseEnquiryRouter.patch(
  "/status/:id",
  isAuth(["admin", "superadmin", "employee"]),
  updateCourseEnquire
);

CourseEnquiryRouter.delete(
  "/:id",
  isAuth(["admin", "superadmin", "employee"]),
  deleteCourseEnquire
);

CourseEnquiryRouter.delete(
  "/all",
  isAuth(["superadmin"]),
  deleteAllCourseEnquires
);

module.exports = CourseEnquiryRouter;
