import { Request, Response } from 'express';
import { User }              from '@modules/users/users.model';
import { usersService }      from '@modules/users/users.service';

class SelfController {
  public async getSelf(request: Request, response: Response) {
    const user = request.user as User;

    return response.send({
      id       : user.id,
      email    : user.email,
      username : user.username,
      createdAt: user.createdAt
    });
  }

  public async deleteSelf(request: Request, response: Response) {
    const user = request.user as User;

    await usersService.deleteUserById(user.id);

    return response.send({
      message: 'Your account was deleted'
    });
  }
}

export const selfController = new SelfController();
