import mongoose from "mongoose";
import { chat } from "../../../schema/bot/chat.js";

class chatController {
    constructor(stringConnection) {
        this._dbConnectionChat = mongoose.createConnection(stringConnection)

        // this._dbConnectionChat.on("connected", () => {
        //     console.log("chat database: isReady");
        // });
        this._dbConnectionChat.on("error", (err) => {
            console.error("Erro na conexão com o banco de dados:", err);
        });
    }

    createChat = async (req, res, next) => {
        try {
            const { data, domain } = req.body
            let model
            if (!this._dbConnectionChat.models[domain]) {
                model = this._dbConnectionChat.model(domain, chat, domain);
            } else {
                model = this._dbConnectionChat.model(domain)
            }
            const Chat = await model.create(data)

            if (!Chat) {
                return res.status(404).send('Error to register chat')
            }

            return res.status(201).json(Chat)
        } catch (err) {
            console.log('Error to create chat')
            next(err)
        }
    }
    updateChat = async (req, res, next) => {
        try {
            const { data, domain, filter } = req.body
            const model = this._dbConnectionChat.model(domain)
            const result = model.updateOne(filter, {
                $set: data
            })
            if (result.nModified === 0) {
                return res.status(404).send('No chat found to update');
            }
            return res.status(204)
        } catch (err) {
            console.error('Error to update', err)
            next(err)
        }
    }
    getChat = async (req, res, next) => {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionChat.model(domain)
            const result = await model.findOne(filter)

            if (!this._dbConnectionChat.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(200).json(result)

        } catch (err) {
            console.error('Error to find the model')
            next(err)
        }
    }
    getAllChat = async (req, res, next) => {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionChat.model(domain)
            const result = await model.find(filter)

            if (!this._dbConnectionChat.models[model]) {
                return res.status(404).send('These models not exist')
            }
            return res.status(200).json(result)

        } catch (err) {
            console.error('Error to find the models')
            next(err)
        }
    }

    deleteChat = async (req, res, next) => {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionChat.model(domain)
            const result = await model.deleteOne(filter)

            if (!this._dbConnectionChat.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(204).send('Chat deleted with sucessful')

        } catch (err) {
            console.error('Error to delete the model')
            next(err)
        }
    }

}
export default chatController;