const express = require("express");

const AuthMiddleware = require("../middleware/AuthMiddleware");
const { createComment } = require("../controller/comment");

const commentRouter = express.Router();

commentRouter.post("/create", AuthMiddleware, createComment);

module.exports = commentRouter;
