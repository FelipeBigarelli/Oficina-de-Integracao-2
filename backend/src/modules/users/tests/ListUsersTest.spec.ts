import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase';
import { ListUsersUseCase } from '../useCases/ListUsersUseCase';

describe('ListUsers', () => {
  it('should be able to list all users', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const listUsers = new ListUsersUseCase(fakeUsersRepository);
    const createUser = new CreateUserUseCase(fakeUsersRepository);

    await createUser.execute({
      name: 'Felipe Bigarelli',
      email: 'felipeteste@gmail.com',
      password: '123456',
      RA: 'a2053659',
    });

    await createUser.execute({
      name: 'Outro Usuário',
      email: 'outroteste@gmail.com',
      password: '123456',
      RA: 'a2053660',
    });

    const users = await listUsers.execute();

    expect(users).toHaveLength(2);
    expect(users[0]).toHaveProperty('id');
    expect(users[1]).toHaveProperty('id');
  });

  it('should return an empty array if no users exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const listUsers = new ListUsersUseCase(fakeUsersRepository);

    const users = await listUsers.execute();

    expect(users).toEqual([]);
  });
});
