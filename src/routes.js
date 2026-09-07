import { Router } from 'express';
import UserController from './app/models/controller/UserController.js';
import SessionController from './app/models/controller/SessionController.js';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

export default routes;
