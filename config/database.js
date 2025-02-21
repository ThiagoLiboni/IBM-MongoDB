import mongodb from 'mongodb'
import data from './constants.js'

import dotenv from 'dotenv'
dotenv.config()

const URI = process.env.STRING_CONNECTION.replace(/\s*database\s*/g);

export const Connections = {
    POLICIES: process.env.STRING_CONNECTION.replace('database', data.POLICY),
    CHAT: process.env.STRING_CONNECTION.replace('database', data.CHAT),
    MESSAGES: process.env.STRING_CONNECTION.replace('database', data.MESSAGES),
    TEMPLATES: process.env.STRING_CONNECTION.replace('database', data.TEMPLATES)
}

const client = new mongodb.MongoClient(URI);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");
        return client;
    } catch (err) {
        console.error('Error connecting to the database:', err.stack);
        throw err;
    }
}
export default connectToDatabase