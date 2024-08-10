const express = require("express");
const isAuth = require("../../middlewares/isAuth.middleware");
const getAllBatches = require("../../controllers/master/batch/get-batch.controller");
const getBatchesCount = require("../../controllers/master/batch/get-batches-count.controller");
const addBatch = require("../../controllers/master/batch/add-batch.controller");
const updateBatch = require("../../controllers/master/batch/update-batch.controller");
const deleteBatches = require("../../controllers/master/batch/delete-batch.controller");
const getBatchById = require("../../controllers/master/batch/get-batch-by-id.controller");
const {
  getTotalStudentInBatch,
} = require("../../controllers/master/batch/get-total-student");
const BatchRouter = express.Router();

BatchRouter.get(
  "/all",
  isAuth(["admin", "student", "superadmin", "employee"]),
  getAllBatches
);

BatchRouter.post("/", isAuth(["admin", "superadmin", "employee"]), addBatch);

BatchRouter.get("/:id", isAuth(), getBatchById);

BatchRouter.patch(
  "/:id",
  isAuth(["admin", "superadmin", "employee"]),
  updateBatch
);

BatchRouter.delete(
  "/:id",
  isAuth(["admin", "superadmin", "employee"]),
  deleteBatches
);

BatchRouter.get("/total-student/:batchId", isAuth(), getTotalStudentInBatch);

BatchRouter.get("/all/count", isAuth(), getBatchesCount);

module.exports = BatchRouter;
