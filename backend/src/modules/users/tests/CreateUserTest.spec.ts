import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserUseCase(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Felipe Bigarelli',
      email: 'felipeteste@gmail.com',
      password: '123456',
      RA: 'a2053659',
    });

    expect(user).toHaveProperty('id');
    expect(user.id).not.toBeUndefined();
  });
});
