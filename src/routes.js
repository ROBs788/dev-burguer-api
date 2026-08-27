import { Router } from 'express';
import User from './app/models/User.js';
import { v4 as uuidv4 } from "uuid"

const routes = new Router();

routes.get('/', async (_req, res) => {
 
  const user = {
    id: uuidv4(),
    name: 'Paulo',
    email: 'n121K8T@example.com',
    password_hash: '123456',
    admin: false,
  };

  await User.create(user);

  res.status(201).json(user);
});
  export default routes;
