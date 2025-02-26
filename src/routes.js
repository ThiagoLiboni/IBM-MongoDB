import express from 'express';
import routesPolicy from './Policy/routes.js';
import { routesBot, routesChat, routesMessage } from './Chat/routes.js';

const routes = express.Router();

routes.use('/api/policy', routesPolicy);
routes.use('/api/chat', routesChat);
routes.use('/api/message', routesMessage);
routes.use('/api/bot', routesBot);

export default routes;