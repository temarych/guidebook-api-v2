import { User } from '@modules/users/users.model';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
