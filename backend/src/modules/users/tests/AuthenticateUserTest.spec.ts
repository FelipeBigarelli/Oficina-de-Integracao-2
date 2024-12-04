import { FakeDateProvider } from '../repositories/fakes/FakeDateProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import { AuthenticateUserUseCase } from '../useCases/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const fakeDateProvider = new FakeDateProvider();

    const createUser = new CreateUserUseCase(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserUseCase(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeDateProvider
    );

    await createUser.execute({
      name: 'Felipe Bigarelli',
      email: 'felipeteste@gmail.com',
      password: '123456',
      RA: 'a2053659',
    });

    const response = await authenticateUser.execute({
      email: 'felipeteste@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
