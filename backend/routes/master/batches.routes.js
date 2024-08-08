const express = require("express");
const isAuth = require("../../middlewares/isAuth.middleware");
const getAllBatches = require("../../controllers/master/batch/get-batch.controller");
const getBatchesCount = require("../../controllers/master/batch/get-batches-count.controller");
const BatchRouter = express.Router();

BatchRouter.get(
  "/all",
  isAuth(["admin", "teacher", "staff", "student", "superadmin"]),
  getAllBatches
);

BatchRouter.post(
  "/",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  (req, res) => {}
);

BatchRouter.get("/:id", isAuth(), (req, res) => {});

BatchRouter.put(
  "/:id",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  (req, res) => {}
);

BatchRouter.delete(
  "/:id",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  (req, res) => {}
);

BatchRouter.get("/all/count", isAuth(), getBatchesCount);

module.exports = BatchRouter;
