import { FakeWorkshopsRepository } from '../repositories/fakes/FakeWorkshopsRepository';

describe('CreateWorkshop', () => {
  it('should be able to create a new workshop', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();

    const workshop = await fakeWorkshopsRepository.create({
      title: 'Workshop de TypeScript',
      description: 'Aprenda os fundamentos do TypeScript',
      date: new Date('2025-05-10'),
      duration: '2h',
    });

    expect(workshop).toHaveProperty('id');
    expect(workshop.title).toBe('Workshop de TypeScript');
    expect(workshop.description).toBe('Aprenda os fundamentos do TypeScript');
    expect(workshop.duration).toBe('2h');
  });
});
