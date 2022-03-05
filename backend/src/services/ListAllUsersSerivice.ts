import { User } from '@prisma/client';
import prismaClient from '../database';

class ListAllUsersService {
  async execute(): Promise<Array<User>> {
    const users: Array<User> | null = await prismaClient.user.findMany();

    return users;
  }
}

export default ListAllUsersService;
