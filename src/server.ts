import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';
import { connectRedis } from './utils/redis';
import app from './app';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await connectRedis(); // this will log connection success or failure
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
