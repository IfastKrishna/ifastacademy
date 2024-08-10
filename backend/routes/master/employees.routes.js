const express = require("express");
const getEmployees = require("../../controllers/master/employee/get-employee.controller");
const isAuth = require("../../middlewares/isAuth.middleware");
const getEmployeesCount = require("../../controllers/master/employee/get-employes-count.controller");
const userRegister = require("../../middlewares/user/user-register.middleware");
const addEmployee = require("../../controllers/master/employee/add-employee.controller");
const getEmployeeById = require("../../controllers/master/employee/get-employee-by-id-controller");
const updateEmployee = require("../../controllers/master/employee/update-employee-controller");
const deleteEmployee = require("../../controllers/master/employee/delete-employee.controller");
const EmployeeRouter = express.Router();

EmployeeRouter.get("/all", isAuth(["admin", "superadmin"]), getEmployees);
EmployeeRouter.post(
  "/",
  isAuth(["admin", "superadmin"]),
  userRegister,
  addEmployee
);
EmployeeRouter.get("/:id", isAuth(["admin", "superadmin"]), getEmployeeById);
EmployeeRouter.patch("/:id", isAuth(["admin", "superadmin"]), updateEmployee);
EmployeeRouter.delete("/:id", isAuth(["admin", "superadmin"]), deleteEmployee);

EmployeeRouter.get("/all/count", isAuth(), getEmployeesCount);
module.exports = EmployeeRouter;
