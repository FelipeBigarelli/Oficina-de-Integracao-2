import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateWorkshopController } from '../modules/workshops/useCases/CreateWorkshopController';
import { DeleteWorkshopController } from '../modules/workshops/useCases/DeleteWorkshopController';
import { ListWorkshopsController } from '../modules/workshops/useCases/ListWorkshopsController';
import { UpdateWorkshopController } from '../modules/workshops/useCases/UpdateWorkshopController';

const createWorkshopController = new CreateWorkshopController();
const listWorkshopsController = new ListWorkshopsController();
const updateWorkshopController = new UpdateWorkshopController();
const deleteWorkshopController = new DeleteWorkshopController();

const workshopsRoutes = Router();

workshopsRoutes.get('/', ensureAuthenticated, listWorkshopsController.handle);

workshopsRoutes.post(
  '/create',
  ensureAuthenticated,
  ensureAdmin,
  createWorkshopController.handle
);

workshopsRoutes.put(
  '/edit/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateWorkshopController.handle
);

workshopsRoutes.delete(
  '/delete',
  ensureAuthenticated,
  ensureAdmin,
  deleteWorkshopController.handle
);

export { workshopsRoutes };
