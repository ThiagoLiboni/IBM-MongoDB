import mongoose from 'mongoose'
import policy from './Schema/policy.ts'
import { Connections } from '../../config/database.js'

class policyController {
    constructor() {
        this._dbConnection = mongoose.createConnection(Connections.POLICIES)
        this._dbConnection.on("connected", () => {
            console.log("Connect with the policies database");
        })
    }
    async registerPolicy(req, res) {
        try {
            const { data, domain } = req.body
            let model
            if (!mongoose.models[domain]) {
                model = mongoose.model(domain, policy, domain);
            }
            model = mongoose.model(domain)
            const result = await model.create(data)

            if (!result) {
                return res.status(400).send('Error registering the policy')
            }
            return res.status(201).json(result)
        } catch (err) {
            console.error('Error to register', err)
            return res.status(500).json({ error: err })
        }
    }
    async updateRegistrationPolicy(req, res) {
        try {
            const { data, domain, filter } = req.body
            const model = mongoose.model(domain)
            const result = model.updateOne(filter, {
                $set: data
            })
            if (result.nModified === 0) {
                return res.status(404).send('No policy registration found to update');
            }
            return res.status(204)
        } catch (err) {
            console.error('Error to update', err)
            return res.status(500).json({ error: err })
        }
    }
    async getPolicy(req, res) {
        try {
            const { domain, filter } = req.body
            const model = mongoose.model(domain)
            const result = await model.findOne(filter)

            if (!mongoose.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(200).json(result)

        } catch (err) {
            console.error('Error to find the model')
            return res.status(500).json({ error: err })
        }
    }
    async deleteRegistrationPolicy(req, res) {
        try {
            const { domain, filter } = req.body
            const model = mongoose.model(domain)
            const result = await model.deleteOne(filter)

            if (!mongoose.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(204).send('Policy registration deleted with sucessful')

        } catch (err) {
            console.error('Error to find the model')
            return res.status(500).json({ error: err })
        }
    }

}
export default policyController;