import mongoose from "mongoose";

const message = new mongoose.Schema({
	status: {type:Number, required:true},
	sendedAt: {type:Date},
	receviedAt: {type:Date},
	attendant: {type: String, required: true},
	from: {type:String, required:true},
	to: {type:String, required:true},
	content: {type:String, required:true},
	readedAt: {type:Date}
})

export default message;