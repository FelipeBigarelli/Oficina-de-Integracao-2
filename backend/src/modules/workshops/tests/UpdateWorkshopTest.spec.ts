import { FakeWorkshopsRepository } from '../repositories/fakes/FakeWorkshopsRepository';

describe('UpdateWorkshop', () => {
  it('should be able to update an existing workshop', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();

    // Criando um workshop inicial
    const workshop = await fakeWorkshopsRepository.create({
      title: 'Workshop de Node.js',
      description: 'Aprenda Node.js',
      date: new Date('2025-02-10'),
      duration: '2h',
    });

    // Atualizando o workshop
    const updatedWorkshop = await fakeWorkshopsRepository.update({
      id: workshop.id,
      title: 'Workshop de NestJS',
      description: 'Aprenda NestJS',
      date: new Date('2025-03-15'),
      duration: '3h',
    });

    expect(updatedWorkshop.id).toBe(workshop.id);
    expect(updatedWorkshop.title).toBe('Workshop de NestJS');
    expect(updatedWorkshop.description).toBe('Aprenda NestJS');
    expect(updatedWorkshop.date).toEqual(new Date('2025-03-15'));
    expect(updatedWorkshop.duration).toBe('3h');
  });

  it('should throw an error if the workshop does not exist', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();

    await expect(
      fakeWorkshopsRepository.update({
        id: 'non-existing-id',
        title: 'Workshop Inválido',
        description: 'Esse workshop não existe',
        date: new Date('2025-04-20'),
        duration: '1h',
      })
    ).rejects.toThrow('Workshop not found');
  });
});
