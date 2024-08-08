const express = require("express");
const getEmployees = require("../../controllers/master/employee/get-employee.controller");
const isAuth = require("../../middlewares/isAuth.middleware");
const getEmployeesCount = require("../../controllers/master/employee/get-employes-count.controller");
const EmployeeRouter = express.Router();

EmployeeRouter.get("/all", isAuth(["admin", "superadmin"]), getEmployees);
EmployeeRouter.post("/", isAuth(["admin", "superadmin"]), (req, res) => {});
EmployeeRouter.get("/:id", isAuth(["admin", "superadmin"]), (req, res) => {});
EmployeeRouter.put("/:id", isAuth(["admin", "superadmin"]), (req, res) => {});
EmployeeRouter.delete(
  "/:id",
  isAuth(["admin", "superadmin"]),
  (req, res) => {}
);

EmployeeRouter.get("/all/count", isAuth(), getEmployeesCount);
module.exports = EmployeeRouter;
