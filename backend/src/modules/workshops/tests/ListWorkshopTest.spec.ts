import { FakeWorkshopsRepository } from '../repositories/fakes/FakeWorkshopsRepository';

describe('ListWorkshops', () => {
  it('should be able to list all workshops', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();

    await fakeWorkshopsRepository.create({
      title: 'Workshop de React',
      description: 'Aprenda a criar SPAs com React',
      date: new Date('2025-06-15'),
      duration: '3h',
    });

    await fakeWorkshopsRepository.create({
      title: 'Workshop de Node.js',
      description: 'Aprenda a criar APIs com Node.js',
      date: new Date('2025-07-20'),
      duration: '4h',
    });

    const workshops = await fakeWorkshopsRepository.list();

    expect(workshops).toHaveLength(2);
    expect(workshops[0]).toHaveProperty('id');
    expect(workshops[1]).toHaveProperty('id');
  });

  it('should return an empty array if no workshops exist', async () => {
    const fakeWorkshopsRepository = new FakeWorkshopsRepository();

    const workshops = await fakeWorkshopsRepository.list();

    expect(workshops).toEqual([]);
  });
});
