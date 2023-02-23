const { v4: uuid } = require("uuid");

const User = require("../database/User");

    const getAllUsers = () => {
    const allUsers = User.getAllUsers();
    return allUsers;
  };
  const createNewUser = (newUser) => {
    const userToInsert = {
      ...newUser,
      id: uuid(),
      createdAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
    };
    try {
      const createdUser = User.createNewUser(userToInsert);
      return createdUser;
    } catch (error) {
      throw error;
    }
  };
  
  
  module.exports = {
    getAllUsers,
    createNewUser,  
  };