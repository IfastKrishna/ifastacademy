const express = require("express");
const isAuth = require("../../middlewares/isAuth.middleware");
const getLeadSources = require("../../controllers/master/lead-source/get-lead-source.controller");
const getLeadSourceById = require("../../controllers/master/lead-source/get-lead-source-by-id");
const addLeadSource = require("../../controllers/master/lead-source/add-lead-source.controller");
const updateLeadSource = require("../../controllers/master/lead-source/update-lead-source.controller");
const deleteLeadSource = require("../../controllers/master/lead-source/delete-lead-source.controller");
const addLeadSourceBulk = require("../../controllers/master/lead-source/add-lead-source-bulk.controller");
const getLeadSourcesCount = require("../../controllers/master/lead-source/get-lead-source-count");
const LeadSourceRouter = express.Router();

LeadSourceRouter.get(
  "/all",
  isAuth(["admin", "superadmin", "teacher", "staff"]),
  getLeadSources
);
LeadSourceRouter.get(
  "/:id",
  isAuth(["admin", "superadmin", "staff", "teacher"]),
  getLeadSourceById
);
LeadSourceRouter.post(
  "/",
  isAuth(["admin", "superadmin", "teacher", "staff"]),
  addLeadSource
);
LeadSourceRouter.patch(
  "/:id",
  isAuth(["admin", "superadmin", "teacher", "staff"]),
  updateLeadSource
);
LeadSourceRouter.delete(
  "/:id",
  isAuth(["admin", "superadmin", "teacher", "staff"]),
  deleteLeadSource
);
LeadSourceRouter.get("/all/count", isAuth(), getLeadSourcesCount);
LeadSourceRouter.post(
  "/bulk",
  isAuth(["admin", "superadmin", "teacher", "staff"]),
  addLeadSourceBulk
);

module.exports = LeadSourceRouter;
