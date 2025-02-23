import mongoose from "mongoose";
import { Connections } from "../../../config/database";
import { bot_agent } from "../../../schema/bot/chat";

class botAgentController {
    constructor() {
        this._dbConnectionChat = mongoose.createConnection(Connections.BOT_AGENT)

        this._dbConnectionChat.on("connected", () => {
            console.log("Connected to the bot agent database");
        });
    }
    async createBotAgent(req,res) {
        try {
            const { data, domain } = req.body
            let model
            if (!mongoose.models[domain]) {
                model = mongoose.model(domain,bot_agent,domain);
            }
            model = mongoose.model(domain)
            const agent = await model.create(data)

            if (!agent) {
                return res.status(404).send('Error to create the agent')
            }

            return res.status(201).json(agent)
        } catch (err) {
            console.log('Error to create', err)
            return res.status(500).json({ error: err.stack })
        }
    }
    async getBotAgent(req, res) {
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
    async updateBotAgent(req, res) {
        try {
            const { data, domain, filter } = req.body
            const model = mongoose.model(domain)
            const result = model.updateOne(filter, {
                $set: data
            })
            if (result.nModified === 0) {
                return res.status(404).send('No agent found to update');
            }
            return res.status(204)
        } catch (err) {
            console.error('Error to update', err)
            return res.status(500).json({ error: err.stack })
        }
    }
    async deleteBotAgent(req, res) {
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
export default botAgentController;