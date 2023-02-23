const DB = require("./db.json");

const { saveToDatabase } = require("./utils");

const getAllUsers = () => {
    return DB.users;
  };

const createNewUser = (newUser) => {
  try {
    const isAlreadyAdded =
      DB.users.findIndex((user) => user.username === newUser.username) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `user with the username '${newUser.username}' already exists`,
      };  
    }
    DB.users.push(newUser);
    saveToDatabase(DB);
    return newUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};


  module.exports = {
    getAllUsers,
    createNewUser,
  };