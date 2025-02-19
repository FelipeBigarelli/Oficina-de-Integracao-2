import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateVolunteerController } from '../modules/volunteers/useCases/CreateVolunteerController';
import { GenerateCertificateController } from '../modules/volunteers/useCases/GenerateCertificateController';

const createVolunteerController = new CreateVolunteerController();
const generateCertificateController = new GenerateCertificateController();

const volunteersRoutes = Router();

volunteersRoutes.post(
  '/create',
  ensureAuthenticated,
  createVolunteerController.handle
);

volunteersRoutes.get(
  '/certificate',
  ensureAuthenticated,
  ensureAdmin,
  generateCertificateController.handle
);

export { volunteersRoutes };
