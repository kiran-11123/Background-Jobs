import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();
import redis_logger from '../logger/redis_logger.js';
import express from 'express'


const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redis_logger.info("Connecting to Redis....")

redisClient.on('error', (err)=>{
    redis_logger.error("Redis Client Error: " + err.message);
})

await redisClient.connect();
redis_logger.info("Redis connected successfully.");
export default redisClient;