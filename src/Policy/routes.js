import express from 'express'
import policyController from './controllers.js';
import { Connections } from '../../config/database.js';

const routes = express.Router();
const Policy = new policyController(Connections.POLICIES);

routes.post('/registerPolicy', Policy.registerPolicy);
routes.get('/getPolicy', Policy.getPolicy)
routes.post('/updateRegistrationPolicy', Policy.updateRegistrationPolicy);
routes.delete('/deletePolicy', Policy.deleteRegistrationPolicy)

export default routes