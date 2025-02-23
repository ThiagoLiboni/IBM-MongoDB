import mongoose from "mongoose";
import { Connections } from "../../../config/database";
import {chat} from "../../../schema/bot/chat.js";

class chatController {
    constructor() {
        this._dbConnectionChat = mongoose.createConnection(Connections.CHAT)

        this._dbConnectionChat.on("connected", () => {
            console.log("Connected to the Chat database");
        });
    }

    async createChat(req, res) {
        try {
            const { data, domain } = req.body
            let model
            if (!mongoose.models[domain]) {
                model = mongoose.model(domain, chat, domain);
            }
            model = mongoose.model(domain)
            const Chat = await model.create(data)

            if (!Chat) {
                return res.status(404).send('Error to register chat')
            }

            return res.status(201).json(Chat)
        } catch (err) {
            console.log('Error to create chat', err)
            return res.status(500).json({ error: err.stack })
        }
    }
    async updateChat(req, res) {
        try {
            const { data, domain, filter } = req.body
            const model = mongoose.model(domain)
            const result = model.updateOne(filter, {
                $set: data
            })
            if (result.nModified === 0) {
                return res.status(404).send('No chat found to update');
            }
            return res.status(204)
        } catch (err) {
            console.error('Error to update', err)
            return res.status(500).json({ error: err.stack })
        }
    }
    async getChat(req, res) {
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
    async getAllChat(req, res) {
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

    async deleteChat(req, res) {
        try {
            const { domain, filter } = req.body
            const model = mongoose.model(domain)
            const result = await model.deleteOne(filter)

            if (!mongoose.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(204).send('Chat deleted with sucessful')

        } catch (err) {
            console.error('Error to delete the model')
            return res.status(500).json({ error: err.stack })
        }
    }

}
export default chatController;