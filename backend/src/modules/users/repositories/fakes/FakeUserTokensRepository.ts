/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../../entities/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class FakeUserTokensRepository implements IUsersTokensRepository {
  private userTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    throw new Error('Method not implemented.');
  }
}

export default FakeUserTokensRepository;
