import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateWorkshopController } from '../modules/workshops/useCases/CreateWorkshopController';
import { ListWorkshopsController } from '../modules/workshops/useCases/ListWorkshopsController';

const createWorkshopController = new CreateWorkshopController();
const listWorkshopsController = new ListWorkshopsController();

const workshopsRoutes = Router();

workshopsRoutes.get('/', ensureAuthenticated, listWorkshopsController.handle);

workshopsRoutes.post(
  '/create',
  ensureAuthenticated,
  ensureAdmin,
  createWorkshopController.handle
);

export { workshopsRoutes };
