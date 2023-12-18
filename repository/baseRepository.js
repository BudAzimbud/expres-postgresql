import { PrismaClient } from "@prisma/client";


class BaseRepository {
  prisma = new PrismaClient();

  constructor(model) {
    this.model = model;
    this.prisma = new PrismaClient();

  }

  async create(data) {
    return await this.prisma[this.model].create({ data });
  }

  async findById(id) {
    return await this.prisma[this.model].findUnique({ where: { id } });
  }

  async updateByEmail(email, data) {
    return await this.prisma[this.model].updateByEmail({ where: { email }, data });
  }

  async delete(id) {
    return await this.prisma[this.model].delete({ where: { id } });
  }

  async findMany(take, skip) {
    return await this.prisma[this.model].findMany({
      take,
      skip,
    });
  }
}

export default BaseRepository;
