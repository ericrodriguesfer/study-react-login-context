import { User } from '@prisma/client';
import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

interface UserDTO {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface UserIdDTO {
  id: string;
}

class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email, username, password }: UserDTO = request.body;

      const user: User = await new CreateUserService().execute({
        name,
        email,
        username,
        password,
      });

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id }: UserIdDTO = request.user;

      const { name, email, username, password }: UserDTO = request.body;

      const userUpdated: User = await new UpdateUserService().execute({
        id,
        name,
        email,
        username,
        password,
      });

      return response.json(userUpdated);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export default UserController;
