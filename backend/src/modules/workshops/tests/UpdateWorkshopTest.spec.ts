import { FakeWorkshopsRepository } from '../repositories/fakes/FakeWorkshopsRepository';
import { UpdateWorkshopUseCase } from '../useCases/UpdateWorkshopUseCase';

describe('UpdateWorkshopUseCase', () => {
  it('should update an existing workshop', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();
    const updateWorkshop = new UpdateWorkshopUseCase(fakeWorkshopsRepository);

    const workshop = await fakeWorkshopsRepository.create({
      title: 'Workshop Antigo',
      description: 'Descrição Antiga',
      date: new Date('2025-07-10'),
      duration: '1h',
    });

    const updatedWorkshop = await updateWorkshop.execute({
      id: workshop.id,
      title: 'Workshop Atualizado',
      description: 'Nova descrição',
      date: new Date('2025-08-10'),
      duration: '2h',
    });

    expect(updatedWorkshop.title).toBe('Workshop Atualizado');
    expect(updatedWorkshop.description).toBe('Nova descrição');
  });
});
