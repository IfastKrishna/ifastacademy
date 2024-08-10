const express = require("express");

const isAuth = require("../middlewares/isAuth.middleware");
const getCourseInquiries = require("../controllers/course-enquire/get-all-course-enquire.controller");
const CourseEnquiryRouter = express.Router();

CourseEnquiryRouter.get(
  "/all",
  isAuth(["admin", "superadmin", "teacher"]),
  getCourseInquiries
);

module.exports = CourseEnquiryRouter;
