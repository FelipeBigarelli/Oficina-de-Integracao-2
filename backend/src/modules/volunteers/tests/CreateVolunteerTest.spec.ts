import { FakeVolunteersRepository } from '../repositories/fakes/FakeVolunteersRepository';
import { CreateVolunteerUseCase } from '../useCases/CreateVolunteerUseCase';

describe('CreateVolunteerUseCase', () => {
  it('should not allow duplicate volunteers for the same workshop', async () => {
    const fakeVolunteersRepository = new FakeVolunteersRepository();
    const createVolunteer = new CreateVolunteerUseCase(
      fakeVolunteersRepository
    );

    const volunteerData = {
      user_id: 'user-123',
      workshop_id: 'workshop-456',
    };

    await createVolunteer.execute(volunteerData);

    await expect(createVolunteer.execute(volunteerData)).rejects.toMatchObject({
      message: 'Usuário já é voluntário neste workshop.',
      statusCode: 409,
    });
  });
});
