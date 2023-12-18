import BaseRepository from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("user");
  }

  async updateByEmail(email, data) {
    return await this.prisma[this.model].update({ where: { email }, data });
  }

  async findByEmail(email){
    return await this.prisma[this.model].findUnique({ where: { email } });
  }
}

export default UserRepository;
