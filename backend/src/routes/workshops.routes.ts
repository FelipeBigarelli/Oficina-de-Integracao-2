import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateWorkshopController } from '../modules/workshops/useCases/CreateWorkshopController';

const createWorkshopController = new CreateWorkshopController();

const workshopsRoutes = Router();

workshopsRoutes.post(
  '/create',
  ensureAuthenticated,
  ensureAdmin,
  createWorkshopController.handle
);

export { workshopsRoutes };
