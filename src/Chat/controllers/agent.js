import mongoose from "mongoose";
import { bot_agent } from "../../../schema/bot/chat.js";

class botAgentController {
    constructor(stringConnection) {
        this._dbConnectionBotAgent = mongoose.createConnection(stringConnection);
        
        // this._dbConnectionBotAgent.on("connected", () => {
        //     console.log("botAgent database is connected ");
        // });
        
        this._dbConnectionBotAgent.on("error", (err) => {
            console.error("Erro na conexão com o banco de dados:", err);
        });
    }
    createBotAgent = async (req, res, next)=> {
        try {
            const { data, domain } = req.body
            let model
            if (!this._dbConnectionBotAgent.models[domain]) {
                model = this._dbConnectionBotAgent.model(domain, bot_agent, domain);
                
            }else{
                model = this._dbConnectionBotAgent.model(domain)
            }
            const agent = await model.create(data)

            if (!agent) {
                return res.status(404).send('Error to create the agent')
            }

            return res.status(201).json(agent)
        } catch (err) {
            console.log('Error to create', err);
            next(err);
        }
    }
    getBotAgent = async (req, res, next)=> {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionBotAgent.model(domain)
            const result = await model.findOne(filter)

            if (!this._dbConnectionBotAgent.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(200).json(result)

        } catch (err) {
            console.error('Error to find the model')
            next(err)
        }
    }
    updateBotAgent = async (req, res, next)=> {
        try {
            const { data, domain, filter } = req.body
            const model = this._dbConnectionBotAgent.model(domain)
            const result = model.updateOne(filter, {
                $set: data
            })
            if (result.nModified === 0) {
                return res.status(404).send('No agent found to update');
            }
            return res.status(204)
        } catch (err) {
            console.error('Error to update')
            next(err)
        }
    }
    deleteBotAgent = async (req, res, next)=> {
        try {
            const { domain, filter } = req.body
            const model = this._dbConnectionBotAgent.model(domain)
            const result = await model.deleteOne(filter)

            if (!this._dbConnectionBotAgent.models[model]) {
                return res.status(404).send('This model not exist')
            }
            return res.status(204).send('Chat deleted with sucessful')

        } catch (err) {
            console.error('Error to delete the model')
            next(err)
        }
    }
}
export default botAgentController;