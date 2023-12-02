import { db }   from '@config/db';
import { User } from './users.model';

class UsersRepository {
  public async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const result = await db.query(
      `
        INSERT INTO users(email, username, password)
        VALUES($1, $2, $3)
        RETURNING *
      `,
      [data.email, data.username, data.password]
    );

    return {
      id       : result.rows[0].id,
      username : result.rows[0].username,
      email    : result.rows[0].email,
      password : result.rows[0].password,
      createdAt: result.rows[0].created_at,
    };
  }

  public async findOneById(id: string): Promise<User | null> {
    const result = await db.query(
      `
        SELECT * FROM users
        WHERE id = $1
      `,
      [id]
    );

    if (!result.rows[0]) return null;

    return {
      id       : result.rows[0].id,
      username : result.rows[0].username,
      email    : result.rows[0].email,
      password : result.rows[0].password,
      createdAt: result.rows[0].created_at,
    };
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const result = await db.query(
      `
        SELECT * FROM users
        WHERE email = $1
      `,
      [email]
    );

    if (!result.rows[0]) return null;

    return {
      id       : result.rows[0].id,
      username : result.rows[0].username,
      email    : result.rows[0].email,
      password : result.rows[0].password,
      createdAt: result.rows[0].created_at,
    };
  }

  public async deleteById(id: string): Promise<void> {
    await db.query(
      `
        DELETE FROM users
        WHERE id = $1
      `,
      [id]
    );
  }

  public async deleteByEmail(email: string): Promise<void> {
    await db.query(
      `
        DELETE FROM users
        WHERE email = $1
      `,
      [email]
    );
  }

  public async countEmails(email: string) {
    const result = await db.query(
      `
        SELECT COUNT(*) AS count FROM users
        WHERE email = $1
      `,
      [email]
    );

    return parseInt(result.rows[0].count);
  }

  public async countUsernames(username: string) {
    const result = await db.query(
      `
        SELECT COUNT(*) AS count FROM users
        WHERE username = $1
      `,
      [username]
    );

    return parseInt(result.rows[0].count);
  }
}

export const usersRepository = new UsersRepository();
