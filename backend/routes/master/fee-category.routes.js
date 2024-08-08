const express = require("express");
const isAuth = require("../../middlewares/isAuth.middleware");
const getFeeCategories = require("../../controllers/master/fee-category/get-fee-categories");
const addFeeCategories = require("../../controllers/master/fee-category/add-fee-categories");
const getFeeCategoriesById = require("../../controllers/master/fee-category/get-fee-categories-by-id");
const deleteFeeCategories = require("../../controllers/master/fee-category/delete-fee-categories");
const updateFeeCategories = require("../../controllers/master/fee-category/update-fee-categories");
const getFeeCategoriesCount = require("../../controllers/master/fee-category/get-fee-category-count-controller");
const FeeCategoryRouter = express.Router();

FeeCategoryRouter.get(
  "/all",
  isAuth(["admin", "teacher", "staff", "student", "superadmin"]),
  getFeeCategories
);

FeeCategoryRouter.post(
  "/",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  addFeeCategories
);

FeeCategoryRouter.post(
  "/bulk",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  (req, res) => {}
);

FeeCategoryRouter.patch("/:id", isAuth(), updateFeeCategories);
FeeCategoryRouter.get(
  "/:id",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  getFeeCategoriesById
);

FeeCategoryRouter.delete(
  "/:id",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  deleteFeeCategories
);

FeeCategoryRouter.get("/all/count", isAuth(), getFeeCategoriesCount);

module.exports = FeeCategoryRouter;
