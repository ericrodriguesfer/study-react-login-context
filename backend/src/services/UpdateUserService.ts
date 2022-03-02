import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import prismaClient from '../database';

interface UpdateUserDTO {
  id: string;
  name: string;
  username?: string;
  email?: string;
  password?: string;
}

class UpdateUserService {
  async execute({
    id,
    name,
    username,
    email,
    password,
  }: UpdateUserDTO): Promise<User> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('This user does not exists in our database');
    }

    if (username && username !== user.username) {
      const userExistsByUserName: User | null =
        await prismaClient.user.findFirst({
          where: { username },
        });

      if (
        user !== userExistsByUserName &&
        userExistsByUserName?.username === username
      ) {
        throw new Error('This username alread exists with other user');
      }
    }

    if (email && email !== user.email) {
      const userExistsByEmail: User | null = await prismaClient.user.findFirst({
        where: { email },
      });

      if (user !== userExistsByEmail && userExistsByEmail?.email === email) {
        throw new Error('This email alread exists with other user');
      }
    }

    if (password) {
      const updatedUser: User = await prismaClient.user.update({
        where: { id: user.id },
        data: {
          name,
          email,
          username,
          password: String(await hash(password, 8)),
        },
      });

      return updatedUser;
    } else {
      const updatedUser: User = await prismaClient.user.update({
        where: { id: user.id },
        data: { name, email, username },
      });

      return updatedUser;
    }
  }
}

export default UpdateUserService;
