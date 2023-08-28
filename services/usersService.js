import UserRepository from "../repository/userRepository.js";

const userRepository = new UserRepository();

export const listUsersService = async (page = 0, limit = 10) => {
  const users = await userRepository.findMany(limit, page * limit);
  return users;
};

export const createUserService = async (data) => {
  const user = await userRepository.create(data);
  return user;
};

export const findUserByIdService = async (id) => {
  const user = await userRepository.findById(id);
  return user;
};

export const updateUserService = async (id, data) => {
  const updatedUser = await userRepository.update(id, data);
  return updatedUser;
};

export const deleteUserService = async (id) => {
  const deletedUser = await userRepository.delete(id);
  return deletedUser;
};
