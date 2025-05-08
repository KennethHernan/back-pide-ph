import { connect } from 'mongoose';
import { env } from './config/environment.js';

export default (async () => {
    try {
        const db = await connect(env.DB_URI)
        console.log("Database is connected to:", db.connection.name);
    } catch (error) {
        throw new Error(error);
    }
})()