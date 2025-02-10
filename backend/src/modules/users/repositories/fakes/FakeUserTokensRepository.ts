import { UserTokens } from '../../entities/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: {
    user_id: string;
    refresh_token: string;
    expires_date: Date;
  }): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      id: Math.random().toString(36).substr(2, 9), // Simula um ID único
      user_id,
      refresh_token,
      expires_date,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    return this.usersTokens.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter((token) => token.id !== id);
  }

  async findByRefreshToken(
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    return this.usersTokens.find(
      (token) => token.refresh_token === refresh_token
    );
  }
}

export { FakeUsersTokensRepository };
