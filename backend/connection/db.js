import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectdb = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb connected successfully`);
    } catch (errr) {
        console.log(`mongodb connection error `, errr);
    }
}

export default connectdb;