import { FakeWorkshopsRepository } from '../repositories/fakes/FakeWorkshopsRepository';
import { DeleteWorkshopUseCase } from '../useCases/DeleteWorkshopUseCase';

describe('DeleteWorkshopUseCase', () => {
  it('should delete a workshop', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();
    const deleteWorkshop = new DeleteWorkshopUseCase(fakeWorkshopsRepository);

    const workshop = await fakeWorkshopsRepository.create({
      title: 'Workshop para Deletar',
      description: 'Será excluído',
      date: new Date('2025-09-10'),
      duration: '1h',
    });

    await deleteWorkshop.execute(workshop.id);

    const workshops = await fakeWorkshopsRepository.list();

    expect(workshops).toHaveLength(0);
  });

  it('should throw an error if the workshop does not exist', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();
    const deleteWorkshop = new DeleteWorkshopUseCase(fakeWorkshopsRepository);

    await expect(deleteWorkshop.execute('non-existing-id')).rejects.toThrow(
      'Workshop not found'
    );
  });
});
