const express = require("express");
const taskController = require("../../controllers/taskController");

const router = express.Router();

router.get("/:taskId", taskController.getOneTask);

router.post("/", taskController.createNewTask);

router.patch("/:taskId", taskController.updateOneTask);

router.delete("/:taskId", taskController.deleteOneTask);


module.exports = router;