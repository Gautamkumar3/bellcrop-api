const express = require("express");
const {
  createComplaint,
  getComplaint,
  getComplaintDetails,
} = require("../controller/complaint");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const complaintRouter = express.Router();

complaintRouter.post("/create", createComplaint);
complaintRouter.get("/", AuthMiddleware, getComplaint);
complaintRouter.get("/:id",AuthMiddleware, getComplaintDetails);

module.exports = complaintRouter;
