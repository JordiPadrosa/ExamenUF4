const taskService = require("../services/taskService");
  
  const getOneTask = (req, res) => {
    const {
      params: { taskId },
    } = req;
    if (!taskId) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter ':taskId' can not be empty" },
        });
    }
    try {
      const task = taskService.getOneTask(taskId);
      res.send({ status: "OK", data: task });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const createNewTask = (req, res) => {
    const { body } = req;
    if (
        !body.user ||
        !body.title ||
        !body.description ||
        !body.status
    ) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: {
            error:
              "One of the following keys is missing or is empty in request body: 'user', 'title', 'description', 'status'",
          },
        });
      return body;
    }

  const newTask = {
    user: body.user,
    title: body.title,
    description: body.description,
    status: body.status,
  };
  
  try {
    const createdTask = taskService.createNewTask(newTask);
    res.status(201).send({ status: "OK", data: createdTask });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

  const updateOneTask = (req, res) => {
    const {
      body,
      params: { taskId },
    } = req;
    if (!taskId) {
      res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':taskId' can not be empty" },
      });    }
      try {
        const updatedTask = taskService.updateOneTask(taskId, body);
        res.send({ status: "OK", data: updatedTask });
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
  };
  
  const deleteOneTask = (req, res) => {
    const {
      params: { taskId },
    } = req;
    if (!taskId) {
      res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':taskId' can not be empty" },
      });
    }
    try {
      taskService.deleteOneTask(taskId);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const getTasksForUser = (req, res) => {
    const {
      params: { userId },
    } = req;
    if (!userId) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter ':userId' can not be empty" },
        });
    }
    if(req.query.createdAt){
      const task = taskService.getTasksForUser(req.query.createdAt);
      console.log(task);
      res.send({ status: "OK", data: task });
    }else {
      try {
        const task = taskService.getTasksForUser(userId);
        console.log(task);
        res.send({ status: "OK", data: task });
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
    }
  };
  
  module.exports = {
    getOneTask,
    createNewTask,
    updateOneTask,
    deleteOneTask,
    getTasksForUser
  };