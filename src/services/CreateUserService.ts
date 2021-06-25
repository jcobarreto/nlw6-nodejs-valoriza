import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}


class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("E-mail incorrect!");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    const passwordHashed = await hash(password, 8);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHashed,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };