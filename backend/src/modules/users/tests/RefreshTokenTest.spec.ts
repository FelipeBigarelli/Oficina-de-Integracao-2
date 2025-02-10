import { sign } from 'jsonwebtoken';

import auth from '../../../config/auth';
import { DayjsDateProvider } from '../../../container/providers/DateProvider/implementations/DayjsDateProvider';
import { FakeUsersTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';
import { RefreshTokenUseCase } from '../useCases/RefreshTokenUseCase';

describe('RefreshTokenUseCase', () => {
  let refreshTokenUseCase: RefreshTokenUseCase;
  let fakeUsersTokensRepository: FakeUsersTokensRepository;
  let dateProvider: DayjsDateProvider;

  beforeEach(() => {
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    refreshTokenUseCase = new RefreshTokenUseCase(
      fakeUsersTokensRepository,
      dateProvider
    );
  });

  it('should generate a new refresh token and access token', async () => {
    const user_id = 'user-123';
    const email = 'test@example.com';

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    await fakeUsersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: dateProvider.addDays(auth.expires_in_refresh_token_days),
    });

    const response = await refreshTokenUseCase.execute(refresh_token);

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('refresh_token');
  });

  it('should throw an error if refresh token does not exist', async () => {
    const invalid_token = sign({}, auth.secret_refresh_token, {
      subject: 'non-existing-user',
      expiresIn: auth.expires_in_refresh_token,
    });

    await expect(
      refreshTokenUseCase.execute(invalid_token)
    ).rejects.toMatchObject({
      message: 'Refresh Token does not exists',
      statusCode: 401,
    });
  });

  it('should throw an error if token is invalid', async () => {
    await expect(
      refreshTokenUseCase.execute('invalid-token')
    ).rejects.toThrow();
  });
});
