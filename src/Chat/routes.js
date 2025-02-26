import express from 'express'
import botAgentController from './controllers/agent.js';
import chatController from './controllers/chat.js';
import messagesController from './controllers/messages.js';
import { Connections } from '../../config/database.js';


const routesBot = express.Router();
const routesChat = express.Router();
const routesMessage = express.Router();

const botAgent = new botAgentController(Connections.BOT_AGENT);
const chat = new chatController(Connections.CHAT);
const messages = new messagesController(Connections.MESSAGES);

routesBot.post('/createBotAgent', botAgent.createBotAgent)
routesBot.put('/updateBotAgent', botAgent.updateBotAgent)
routesBot.delete('/deleteBotAgent', botAgent.deleteBotAgent)
routesBot.get('/getBotAgent', botAgent.getBotAgent)

routesChat.post('/createChat', chat.createChat)
routesChat.put('/updateChat', chat.updateChat)
routesChat.delete('/deleteChat', chat.deleteChat)
routesChat.get('/getChat', chat.getChat)
routesChat.get('/getAllChats', chat.getAllChat)

routesMessage.post('/registerMessage', messages.registerMessage)
routesMessage.get('/getMessage', messages.getMessage)
routesMessage.get('/getAllMessages', messages.getAllMessages)


export {routesBot, routesChat, routesMessage}
