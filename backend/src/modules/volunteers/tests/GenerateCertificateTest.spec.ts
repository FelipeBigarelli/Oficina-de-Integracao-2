import fs from 'fs';

import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import { FakeWorkshopsRepository } from '../../workshops/repositories/fakes/FakeWorkshopsRepository';
import { FakeVolunteersRepository } from '../repositories/fakes/FakeVolunteersRepository';
import { GenerateCertificateUseCase } from '../useCases/GenerateCertificateUseCase';

describe('GenerateCertificateUseCase', () => {
  it('should generate a certificate for a volunteer', async () => {
    const fakeVolunteersRepository = new FakeVolunteersRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();
    const generateCertificate = new GenerateCertificateUseCase(
      fakeVolunteersRepository,
      fakeUsersRepository,
      fakeWorkshopsRepository
    );

    const user = await fakeUsersRepository.create({
      name: 'Lucas Martins',
      email: 'lucas@example.com',
      password: '123456',
      RA: 'A123456',
    });

    const workshop = await fakeWorkshopsRepository.create({
      title: 'Workshop de TypeScript',
      description: 'Aprenda TypeScript na prática',
      date: new Date('2025-06-10'),
      duration: '3h',
    });

    await fakeVolunteersRepository.create({
      user_id: user.id,
      workshop_id: workshop.id,
    });

    const certificatePath = await generateCertificate.execute({
      user_id: user.id,
      workshop_id: workshop.id,
    });

    expect(fs.existsSync(certificatePath)).toBe(true);
  });

  it('should throw an error if the volunteer does not exist', async () => {
    const fakeVolunteersRepository = new FakeVolunteersRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();
    const generateCertificate = new GenerateCertificateUseCase(
      fakeVolunteersRepository,
      fakeUsersRepository,
      fakeWorkshopsRepository
    );

    await expect(
      generateCertificate.execute({
        user_id: 'non-existing-user',
        workshop_id: 'non-existing-workshop',
      })
    ).rejects.toMatchObject({
      message: 'Usuário não é voluntário neste workshop.',
      statusCode: 404,
    });
  });
});
