import mongoose from "mongoose";

const policy = new mongoose.Schema({

    id_user: {type: String, required: true},
    id_doc: {type: String, required: true},
    validity: {type: Date, required: true},
    company: {type: Number, required: true},
    status: {type: Number, required: true},
    category: {
        type: {type: Number, required: true},
        description: {type: mongoose.Schema.Types.Mixed},
    },
    coverage:{
        services:{type: [String], required: true }
    },
    payment: {
        total_value: {type: String, required: true},
        type_payment: {type: Number, required: true},
        description: {type: String}

    },
    reminder_payment: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true}


})

export default policy;