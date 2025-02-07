import { Router } from 'express';
import { container } from 'tsyringe';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateVolunteerController } from '../modules/volunteers/useCases/CreateVolunteerController';

const volunteersRoutes = Router();

volunteersRoutes.post('/create', ensureAuthenticated, (request, response) => {
  return container.resolve(CreateVolunteerController).handle(request, response);
});

export { volunteersRoutes };
