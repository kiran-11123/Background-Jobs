import 'dotenv/config';
import mongoose from 'mongoose';
import app_logger from "../utils/logger/App_logger.js";

// prefer common env names, accept either
const mongooseUrl = process.env.MONGOOSE_URL ?? process.env.MONGODB_URI;

if (!mongooseUrl) {
  app_logger.error('MongoDB connection string missing. Set MONGOOSE_URL or MONGODB_URI in backend/.env');
  process.exit(1);
}

const ConnectDB = async () => {
  try {
    await mongoose.connect(mongooseUrl);
    app_logger.info("MongoDB connected..");
  } catch (er) {
    app_logger.warn(`Error occurred while connecting to MongoDB ${er}`);
    process.exit(1);
  }
};

export default ConnectDB;