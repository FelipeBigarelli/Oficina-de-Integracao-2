import { IDateProvider } from '../../../../container/providers/DateProvider/IDateProvider';

class FakeDateProvider implements IDateProvider {
  dateNow(): Date {
    return new Date();
  }
  addHours(hours: number): Date {
    const date = new Date();
    date.setHours(date.getHours() + hours); // Adiciona as horas à data atual
    return date;
  }
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return start_date < end_date;
  }
  addDays(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  now(): Date {
    return this.dateNow();
  }
}

export { FakeDateProvider };
