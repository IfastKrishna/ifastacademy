const express = require("express");
const {
  getCourseInquiries,
} = require("../controllers/course-enquire/get-all-course-enquire");
const isAuth = require("../middlewares/isAuth.middleware");
const CourseEnquiryRouter = express.Router();

CourseEnquiryRouter.get(
  "/all",
  isAuth(["admin", "superadmin", "teacher"]),
  getCourseInquiries
);

module.exports = CourseEnquiryRouter;
