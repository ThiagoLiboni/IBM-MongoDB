import mongoose from 'mongoose'
import policy from '../../schema/policy.js'

class policyController {
    constructor(stringConnection) {
        this._dbConnectionPolicies = mongoose.createConnection(stringConnection)

        // this._dbConnectionPolicies.on("connected", () => {
        //     console.log("policies database is connected");
        // })
    }
    registerPolicy = async (req, res, next)=> {
        try {
            const { data, domain } = req.body
            let model
            if (!this._dbConnectionPolicies.models[domain]) {
                model = this._dbConnectionPolicies.model(domain, policy, domain);
            }
            model = this._dbConnectionPolicies.model(domain)
            const result = await model.create(data)

            if (!result) {
                return res.status(400).send('Error registering the policy')
            }
            return res.status(201).json(result)
        } catch (err) {
            console.error('Error to register', err)
            next(err)
        }
    }
    updateRegistrationPolicy = async (req, res, next)=> {
        try {
            const { data, domain, filter } = req.body
            const model = this._dbConnectionPolicies.model(domain)
            const result = model.updateOne(filter, {
                $set: data
            })
            if (result.nModified === 0) {
                return res.status(404).send('No policy registration found to update');
            }
            return res.status(204)
        } catch (err) {
            console.error('Error to update', err)
            rext(err)
        }
    }
    getPolicy = async (req, res, next)=> {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionPolicies.model(domain)
            const result = await model.findOne(filter)

            if (!mongoose.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(200).json(result)

        } catch (err) {
            console.error('Error to find the model')
            next(err)
        }
    }
    deleteRegistrationPolicy = async (req, res, next)=> {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionPolicies.model(domain)
            const result = await model.deleteOne(filter)

            if (!mongoose.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(204).send('Policy registration deleted with sucessful')

        } catch (err) {
            console.error('Error to find the model')
            next(err)
        }
    }

}
export default policyController;