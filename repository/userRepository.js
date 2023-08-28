import BaseRepository from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("user"); // Make sure the string matches your Prisma model name
  }
}

export default UserRepository;
