import { Router } from 'express';

import { AuthenticateUserController } from '../modules/users/useCases/AuthenticateUserController';
import { RefreshTokenController } from '../modules/users/useCases/RefreshTokenController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
