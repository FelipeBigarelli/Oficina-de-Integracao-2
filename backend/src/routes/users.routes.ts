import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../modules/users/useCases/CreateUserController';
import { ListUsersController } from '../modules/users/useCases/ListUsersController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listUsersController.handle
);
usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
