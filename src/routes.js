import express from 'express';
import routesPolicy from './Policy/routes.js';
import { routesBot, routesChat, routesMessage } from './Chat/routes.js';
import { authorize } from './utils/middleware.js';

const routes = express.Router();

routes.use('/api/policy', authorize, routesPolicy);
routes.use('/api/chat', authorize, routesChat);
routes.use('/api/message', authorize, routesMessage);
routes.use('/api/bot',authorize, routesBot);

export default routes;