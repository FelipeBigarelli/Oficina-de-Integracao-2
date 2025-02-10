import { FakeWorkshopsRepository } from '../repositories/fakes/FakeWorkshopsRepository';
import { CreateWorkshopUseCase } from '../useCases/CreateWorkshopUseCase';

describe('CreateWorkshopUseCase', () => {
  it('should create a new workshop', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();
    const createWorkshop = new CreateWorkshopUseCase(fakeWorkshopsRepository);

    const workshop = await createWorkshop.execute({
      title: 'Workshop de TypeScript',
      description: 'Aprenda TypeScript na prática',
      date: new Date('2025-05-10'),
      duration: '3h',
    });

    expect(workshop).toHaveProperty('id');
    expect(workshop.title).toBe('Workshop de TypeScript');
  });
});
