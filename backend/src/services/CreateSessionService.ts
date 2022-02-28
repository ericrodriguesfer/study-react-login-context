import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { expiresIn, secret } from '../config/config.jwt';
import prismaClient from '../database';

interface CreateSessionDTO {
  email: string;
  password: string;
}

interface RespondeDataSessionDTO {
  token: string;
  name: string;
  username: string;
  email: string;
}

class CreateSessionService {
  async execute({
    email,
    password,
  }: CreateSessionDTO): Promise<RespondeDataSessionDTO> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('This user does not exists in our database');
    }

    if (!(await compare(password, user.password))) {
      throw new Error('This password repassed does not match');
    }

    return {
      token: sign(
        { id: user.id, name: user.name, email: user.email },
        secret || 'qwe123321ewq',
        { expiresIn: expiresIn },
      ),
      name: user.name,
      username: user.username,
      email: user.email,
    };
  }
}

export default CreateSessionService;
