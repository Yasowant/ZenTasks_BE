import { Redis } from '@upstash/redis';

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error('Redis environment variables are not set');
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const connectRedis = async () => {
  try {
    const pong = await redis.ping();
    console.log('✅ Redis connected:', pong);
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
  }
};

export default redis;
