import { Router } from 'express';
import { container } from 'tsyringe';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateVolunteerController } from '../modules/volunteers/useCases/CreateVolunteerController';
import { GenerateCertificateController } from '../modules/volunteers/useCases/GenerateCertificateController';

const generateCertificateController = new GenerateCertificateController();

const volunteersRoutes = Router();

volunteersRoutes.post('/create', ensureAuthenticated, (request, response) => {
  return container.resolve(CreateVolunteerController).handle(request, response);
});

volunteersRoutes.get(
  '/certificate/:id',
  ensureAuthenticated,
  generateCertificateController.handle
);

export { volunteersRoutes };
