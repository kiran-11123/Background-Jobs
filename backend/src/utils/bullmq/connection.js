import Redis from "ioredis";

export const bullConnection = new Redis(process.env.REDIS_URL || "redis://localhost:6379");