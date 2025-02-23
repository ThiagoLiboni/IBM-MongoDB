import mongoose from "mongoose";
import { Connections } from "../../../config/database";
import message from "../../../schema/bot/message.js"

class messagesController {
    constructor() {
        this._dbConnectionMesseges = mongoose.createConnection(Connections.MESSAGES)
        this._dbConnectionMessages.on("connected", () => {
            console.log("Connected to the Messages database");
        });
    }
     async registerMessage(req, res) {
            try {
                const { data, domain } = req.body
                let model
                if (!mongoose.models[domain]) {
                    model = mongoose.model(domain, message, domain);
                }
                model = mongoose.model(domain)
                const Message = await model.create(data)
    
                if (!Message) {
                    return res.status(404).send('Error to register message')
                }
    
                return res.status(201).json(Message)
            } catch (err) {
                console.log('Error to create chat', err)
                return res.status(500).json({ error: err.stack })
            }
        }
        async getMessage(req, res) {
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
                return res.status(500).json({ error: err.stack })
            }
        }
        async getAllMessages(req, res) {
            try {
                const { domain, filter } = req.body
                const model = mongoose.model(domain)
                const result = await model.find(filter)
    
                if (!mongoose.models[model]) {
                    return res.status(404).send('These models not exist')
                }
                return res.status(200).json(result)
    
            } catch (err) {
                console.error('Error to find the models')
                return res.status(500).json({ error: err.stack })
            }
        }
}
export default messagesController;