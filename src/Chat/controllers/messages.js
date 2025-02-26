import mongoose from "mongoose";
import message from "../../../schema/bot/message.js"

class messagesController {
    constructor(stringConnection) {
        this._dbConnectionMessages = mongoose.createConnection(stringConnection)

        // this._dbConnectionMessages.on("connected", () => {
        //     console.log("message database is connected");
        // });
        this._dbConnectionMessages.on("error", (err) => {
            console.error("Erro na conexão com o banco de dados:", err);
        });
       
    }
    registerMessage = async (req, res, next)=> {
        try {
            const { data, domain } = req.body
            let model
            if (!this._dbConnectionMessages.models[domain]) {
                model = this._dbConnectionMessages.model(domain, message);
            }else{
            model = this._dbConnectionMessages.model(domain)
            }
            const Message = await model.create(data)

            if (!Message) {
                return res.status(404).send('Error to register message')
            }

            return res.status(201).json(Message)
        } catch (err) {
            console.log('Error to register message', err)
            next(err)
        }
    }
    getMessage = async (req, res, next)=> {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionMessages.model(domain)
            const result = await model.findOne(filter)

            if (!this._dbConnectionMessages.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(200).json(result)

        } catch (err) {
            console.error('Error to find the model')
            next(err)
        }
    }
    getAllMessages = async (req, res, next)=> {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionMessages.model(domain)
            const result = await model.find(filter)

            if (!this._dbConnectionMessages.models[model]) {
                return res.status(404).send('These models not exist')
            }
            return res.status(200).json(result)

        } catch (err) {
            console.error('Error to find the models')
            next(err)
        }
    }
}
export default messagesController;