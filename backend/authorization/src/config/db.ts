import mongoose from 'mongoose';
import {DB_URI} from "../constants/env";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Successfully connected to the database!")
    } catch (err) {
        console.log('Could not connect to database', err);
        process.exit(1);
    }
}