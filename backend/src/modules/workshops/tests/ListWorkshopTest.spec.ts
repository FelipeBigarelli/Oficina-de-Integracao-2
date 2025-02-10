import { FakeWorkshopsRepository } from '../repositories/fakes/FakeWorkshopsRepository';
import { ListWorkshopsUseCase } from '../useCases/ListWorkshopsUseCase';

describe('ListWorkshopsUseCase', () => {
  it('should list all workshops', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();
    const listWorkshops = new ListWorkshopsUseCase(fakeWorkshopsRepository);

    await fakeWorkshopsRepository.create({
      title: 'Workshop de React',
      description: 'Aprenda React na prática',
      date: new Date('2025-06-10'),
      duration: '2h',
    });

    const workshops = await listWorkshops.execute();

    expect(workshops).toHaveLength(1);
    expect(workshops[0]).toHaveProperty('id');
    expect(workshops[0].title).toBe('Workshop de React');
  });

  it('should return an empty array if no workshops exist', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();
    const listWorkshops = new ListWorkshopsUseCase(fakeWorkshopsRepository);

    const workshops = await listWorkshops.execute();

    expect(workshops).toEqual([]);
  });
});
