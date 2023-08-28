import {
  listUserRepository,
  createUserRepository,
} from "../repository/usersRepository.js";

export const listUserService = async () => {
  const getUsers = await listUserRepository();
  return getUsers;
};

export const createUserService = async (body) => {
  const createUsers = await createUserRepository(body);
  return createUsers;
};
