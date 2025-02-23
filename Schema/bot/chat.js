import mongoose from "mongoose";

export const bot_agent = new mongoose.Schema({
	nickname: {type: String, required:true},
	id_user: {type: String, required: true}

})
export const chat = new mongoose.Schema({
	target: {type: String, required: true},
	bot_chat: {
		id: {type: String, required: true},
		started_at: {type: Date.now, required: true},
		closed_at: {type: Date, default: "", required: true},
		flux: {type: String, required: true}
    }
})
export const chatFlux = new mongoose.Schema({
	id_creator: {type: String, required: true},
	name: {type: String, required: true},
	createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true},
	steps:{
			type: {type: Number, required: true },
			content: {type: String, required: true},
		}
})