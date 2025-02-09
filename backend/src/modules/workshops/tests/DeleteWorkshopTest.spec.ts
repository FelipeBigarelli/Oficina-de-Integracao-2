import { FakeWorkshopsRepository } from '../repositories/fakes/FakeWorkshopsRepository';

describe('DeleteWorkshop', () => {
  it('should be able to delete a workshop', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();

    // Criando um workshop
    const workshop = await fakeWorkshopsRepository.create({
      title: 'Workshop de Angular',
      description: 'Aprenda Angular do básico ao avançado',
      date: new Date('2025-08-25'),
      duration: '5h',
    });

    await fakeWorkshopsRepository.delete(workshop.id);

    const workshops = await fakeWorkshopsRepository.list();

    expect(workshops).toHaveLength(0);
  });

  it('should throw an error when trying to delete a non-existent workshop', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();

    await expect(
      fakeWorkshopsRepository.delete('non-existing-id')
    ).rejects.toThrow('Workshop not found');
  });
});
