import express from 'express'
import routesPolicy from './src/Policy/routes';
const routes = express.Router()

routes.use('/api/policy', routesPolicy)

export default routes;