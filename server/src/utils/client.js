
import dotenv from 'dotenv'
import {Redis} from "ioredis";

dotenv.config({})

const client = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
})

const expire_cache = process.env.REDIS_CACHE_EXPIRY

export class Cache {

    constructor(expiredAt = expire_cache) {
        this.expiredAt = expiredAt; // Default expiration is 600 seconds (can be overridden)
      }
    
      // string ---

    async expireData(key){
        try {
            await client.expire(key,this.expiredAt)
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }
    
    async set(key,value,expirationTime=this.expiredAt){
        try {
            await client.set(key,JSON.stringify(value))
            await client.expire(key,expirationTime)
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }

    async get(key){
        try {
            const cachedData = await client.get(key)
            return cachedData ? JSON.parse(cachedData) : null;
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }


    // hash ---

    async hSet(key,field,value,expirationTime=this.expiredAt){
        try {
            await client.hset(key,field, JSON.stringify(value));
            await client.expire(key, expirationTime);
            
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }

    async hGet(key,value){
        try {
            const cachedData = await client.hget(key,value); 
            return cachedData ? JSON.parse(cachedData) : null;
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }

    async hdel(key,fieldKey){
        try {
            console.log("cached")
            await client.hdel(key,fieldKey); 
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }


    // list --

    async lpush(key,value,expiredAt=this.expiredAt){
        try {
           await client.lpush(key,JSON.stringify(value))
           await client.expire(key,expiredAt)
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }

    async lrange(key){
        try {
            const data = await client.lrange(key,0,-1)
            return JSON.parse ? JSON.parse(data) : null
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }
    // delete cache 

    async del(key){
        await client.del(key)
    }
}

client.on('connect', () => {
    console.log('Connected to Redis successfully!');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default client