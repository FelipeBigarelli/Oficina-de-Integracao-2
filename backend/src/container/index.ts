import { container } from 'tsyringe';

import { IUsersRepository } from '../modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '../modules/users/repositories/IUsersTokensRepository';
import { UsersRepository } from '../modules/users/repositories/UsersRepository';
import { UsersTokensRepository } from '../modules/users/repositories/UsersTokensRepository';
import { IVolunteersRepository } from '../modules/volunteers/repositories/IVolunteersRepository';
import { VolunteersRepository } from '../modules/volunteers/repositories/VolunteersRepository';

import './providers/DateProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);

container.registerSingleton<IVolunteersRepository>(
  'VolunteersRepository',
  VolunteersRepository
);
