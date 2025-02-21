import mongoose from "mongoose";

const template = new mongoose.Schema({

    id_user:{ type:String, required:true},
    name: {type:String, required:true},
    content: {type:String, required:true},
    variables: {type: [String], default: 0}

})

export default template