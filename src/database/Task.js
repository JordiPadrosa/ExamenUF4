const DB = require("./db.json");

const { saveToDatabase } = require("./utils");


const getOneTask = (taskId) => {
  try {
    const task = DB.tasks.find((task) => task.id === taskId);
    console.log(task);
    if (!task) {
      throw {
        status: 400,
        message: `Can't find task with the id '${taskId}'`,
      };
    }
    return task;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewTask = (newTask) => {
  try {
    const isAlreadyAdded =
      DB.tasks.findIndex((task) => task.title === newTask.title) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `task with the title '${newTask.title}' already exists`,
      };  
    }
    const userExist =
      DB.users.findIndex((user) => user.username === newTask.user) > -1;
    if (!userExist) {
      throw {
        status: 400,
        message: `user with the username '${newTask.user}' no exists`,
      };
    }
    DB.tasks.push(newTask);
    saveToDatabase(DB);
    return newTask;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

  const updateOneTask = (taskId, changes) => {
    try {
      const isAlreadyAdded =
        DB.tasks.findIndex((task) => task.user === changes.user) > -1;
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `task with the username '${changes.user}' already exists`,
        };
      }
      if(changes.user){
        const userExist =
        DB.users.findIndex((user) => user.username === changes.user) > -1;
        if (!userExist) {
          throw {
            status: 400,
            message: `user with the username '${changes.user}' no exists`,
          };
        }
      }
      
      const indexForUpdate = DB.tasks.findIndex(
        (task) => task.id === taskId
      );
      if (indexForUpdate === -1) {
        throw {
          status: 400,
          message: `Can't find task with the id '${taskId}'`,
        };
      }
      const updatedtask = {
        ...DB.tasks[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
      };
      DB.tasks[indexForUpdate] = updatedtask;
      saveToDatabase(DB);
      return updatedtask;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };
  
  const deleteOneTask = (taskId) => {
    try {
      const indexForDeletion = DB.tasks.findIndex(
        (task) => task.id === taskId
      );
      if (indexForDeletion === -1) {
        throw {
          status: 400,
          message: `Can't find task with the id '${taskId}'`,
        };
      }
      DB.tasks.splice(indexForDeletion, 1);
      saveToDatabase(DB);
    }catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  const getTasksForUser = (userId) => {
    try {
      const task = DB.tasks.find((task) => task.user === userId);
      if (!task) {
        throw {
          status: 400,
          message: `Can't find user with the id '${userId}'`,
        };
      }
      return task;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  module.exports = {
    getOneTask,
    createNewTask,
    updateOneTask,
    deleteOneTask,
    getTasksForUser
  };