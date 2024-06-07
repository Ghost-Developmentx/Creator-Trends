import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
    try {
        const uri = process.env.NODE_ENV === 'test'
            ? 'mongodb://127.0.0.1:27017/creator-trends-test' // Test database
            : 'mongodb://127.0.0.1:27017/creator-trends'; // Development/production database

        const connection = await mongoose.connect(uri)
        console.log(`Connected to database: ${connection.connection.host}`)
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`)
        process.exit(1);
    }
}

export default connectDB