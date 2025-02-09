import { Router } from 'express';

import { ExecuteCustomQueryController } from '../modules/volunteers/useCases/ExecuteCustomQueryController';

const customQueryRoutes = Router();
const executeCustomQueryController = new ExecuteCustomQueryController();

customQueryRoutes.post('/execute-query', executeCustomQueryController.handle);

export { customQueryRoutes };
