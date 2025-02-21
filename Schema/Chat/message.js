import mongoose from "mongoose";

const message = new mongoose.Schema({
    id: {type:String, requided:true},
	status: {type:Number, required:true},
	readedAt: {type:Date},
	to: {type:String, required:true},
	content: {type:String, required:true},
	from: {type:String, required:true},
	sendedAt: {type:Date}
})

export default mongoose.model('Message',message);