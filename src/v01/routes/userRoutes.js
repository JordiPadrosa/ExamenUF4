const express = require("express");
const userController = require("../../controllers/userController");
const taskController = require("../../controllers/taskController");

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:userId/tasks", taskController.getTasksForUser);

router.post("/", userController.createNewUser);

module.exports = router;