import { User }            from './users.model';
import { usersRepository } from './users.repository';

class UsersService {
  public async createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return await usersRepository.create(data);
  }

  public async findUserById(id: string): Promise<User | null> {
    return await usersRepository.findOneById(id);
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return await usersRepository.findOneByEmail(email);
  }

  public async deleteUserById(id: string): Promise<void> {
    return await usersRepository.deleteById(id);
  }

  public async deleteUserByEmail(email: string): Promise<void> {
    return await usersRepository.deleteByEmail(email);
  }

  public async isEmailUnique(email: string) {
    return await usersRepository.countEmails(email) === 0;
  }

  public async isUsernameUnique(username: string) {
    return await usersRepository.countUsernames(username) === 0;
  }
}

export const usersService = new UsersService();
