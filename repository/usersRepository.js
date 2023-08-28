import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listUserRepository = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const createUserRepository = async (data) => {
  const createUsers = await prisma.user.create({
    data,
  });
  return createUsers;
};
export { listUserRepository, createUserRepository };
