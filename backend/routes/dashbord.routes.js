const express = require("express");
const {
  todayCollectedFees,
  myTotalExpense,
  myIncome,
  totalDropoutsStudents,
  myTotalBatch,
  todayAdmission,
  totalAdmissionInThisMonth,
  todayFollowUp,
  totalCollectedFeesByRange,
} = require("../controllers/dasboard/admin-employee.controller");
const isAuth = require("../middlewares/isAuth.middleware");
const DashboardRouter = express.Router();

DashboardRouter.get(
  "/total-collected-fees-by-range",
  isAuth(),
  totalCollectedFeesByRange
);

DashboardRouter.get("/today-collected-fees", isAuth(), todayCollectedFees);

DashboardRouter.get("/my-total-expense", isAuth(), myTotalExpense);

DashboardRouter.get("/my-income", isAuth(), myIncome);

DashboardRouter.get("/total-dropout-student", isAuth(), totalDropoutsStudents);

DashboardRouter.get("/my-total-batch", isAuth(), myTotalBatch);

DashboardRouter.get("/today-admission", todayAdmission);

DashboardRouter.get(
  "/total-admission-in-this-month",
  isAuth(),
  totalAdmissionInThisMonth
);

DashboardRouter.get("/today-followup", isAuth(), todayFollowUp);

module.exports = DashboardRouter;
