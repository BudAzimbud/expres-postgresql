import UserRepository from "../repository/userRepository.js";
import { hashPassword } from "./auth/hashService.js";

const userRepository = new UserRepository();

export const listUsersService = async (page = 0, limit = 10) => {
  const users = await userRepository.findMany(limit, page * limit);
  return users;
};

export const createUserService = async (data) => {
  const user = await userRepository.create({
    ...data,
    password: await hashPassword(data.password),
  });
  return user;
};

export const findUserByEmailService = async (email) => {
  const user = await userRepository.findByEmail(email);
  return user;
};

export const updateUserByEmailService = async (email, data) => {
  const updatedUser = await userRepository.updateByEmail(email, {
    ...data,
    password: await hashPassword(data.password),
  });
  return updatedUser;
};

export const deleteUserService = async (id) => {
  const deletedUser = await userRepository.delete(id);
  return deletedUser;
};
