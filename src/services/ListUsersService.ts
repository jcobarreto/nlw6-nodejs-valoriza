import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { classToPlain } from "class-transformer";

class ListUsersService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return classToPlain(users);
  }
}

export { ListUsersService };