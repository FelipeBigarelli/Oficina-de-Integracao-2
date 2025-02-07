import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { usersRoutes } from './users.routes';
import { volunteersRoutes } from './volunteers.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/volunteers', volunteersRoutes);
router.use(authenticateRoutes);

export { router };
