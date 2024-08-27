const express = require("express");
const getCourse = require("../../controllers/master/course/get-course.controller");
const isAuth = require("../../middlewares/isAuth.middleware");
const deleteCourse = require("../../controllers/master/course/delete-course.controller");
const addCourse = require("../../controllers/master/course/add-course.controller");
const getCourseById = require("../../controllers/master/course/get-courese-byid.controller");
const updateCourse = require("../../controllers/master/course/update-course.controller");
const getCoursesCount = require("../../controllers/master/course/get-courses-count.controller");
const CourseRouter = express.Router();

CourseRouter.get("/all", isAuth(), getCourse);
CourseRouter.post("/", isAuth(["admin", "superadmin", "employee"]), addCourse);

CourseRouter.get("/:id", isAuth(), getCourseById);

CourseRouter.patch(
  "/:id",
  isAuth(["admin", "superadmin", "employee"]),
  updateCourse
);

CourseRouter.delete("/:id", isAuth(["admin", "superadmin"]), deleteCourse);
CourseRouter.get("/all/count", isAuth(), getCoursesCount);

module.exports = CourseRouter;
