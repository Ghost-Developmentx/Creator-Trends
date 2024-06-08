var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uri = process.env.NODE_ENV === 'test'
                ? 'mongodb://127.0.0.1:27017/creator-trends-test' // Test database
                : 'mongodb://127.0.0.1:27017/creator-trends'; // Development/production database
            const connection = yield mongoose.connect(uri);
            console.log(`Connected to database: ${connection.connection.host}`);
        }
        catch (error) {
            console.error(`MongoDB connection error: ${error}`);
            process.exit(1);
        }
    });
}
export default connectDB;
