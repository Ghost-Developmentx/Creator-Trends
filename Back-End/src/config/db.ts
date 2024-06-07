import mongoose from 'mongoose'

async function connectDB() {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/creator-trends')
        console.log(`Connected to database: ${connection.connection.host}`)
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`)
        process.exit(1);
    }
}

export default connectDB