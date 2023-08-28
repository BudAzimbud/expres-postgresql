import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await prisma[this.model].create({ data });
  }

  async findById(id) {
    return await prisma[this.model].findUnique({ where: { id } });
  }

  async update(id, data) {
    return await prisma[this.model].update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma[this.model].delete({ where: { id } });
  }

  async findMany(take, skip) {
    return await prisma[this.model].findMany({
      take,
      skip,
    });
  }
}

export default BaseRepository;
