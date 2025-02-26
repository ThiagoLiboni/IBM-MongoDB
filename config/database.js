import {ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose';
import data from './constants.js'

import dotenv from 'dotenv'
dotenv.config()

// const URI = process.env.STRING_CONNECTION;
const URI = process.env.STRING_CONNECTION.replace(/\s*database\s*/g);

export const Connections = {
    POLICIES: process.env.STRING_CONNECTION.replace('database', data.POLICY),
    CHAT: process.env.STRING_CONNECTION.replace('database', data.CHAT),
    BOT_AGENT: process.env.STRING_CONNECTION.replace('database', data.AGENT),
    MESSAGES: process.env.STRING_CONNECTION.replace('database', data.MESSAGES),
    TEMPLATES: process.env.STRING_CONNECTION.replace('database', data.TEMPLATES)
}

async function connectToDatabase() {
    try {
        mongoose.connect(URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })

    } catch (err) {
        mongoose.disconnect();
        console.error('Error connecting to the database:', err.stack);
        throw err;
    }
}
export default connectToDatabase