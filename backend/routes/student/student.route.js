const express = require("express");
const registerStudent = require("../../controllers/student/register.controller");
const userRegister = require("../../middlewares/user/user-register");
const studentRouter = express.Router();

studentRouter.post("/", userRegister, registerStudent);
studentRouter.get("/", isAuth, getStudent);

module.exports = studentRouter;
