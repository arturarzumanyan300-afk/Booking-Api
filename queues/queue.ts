import { Queue } from "bullmq";
import { redis } from "../modules/config/redis";


export const queue=new Queue("email",{
    connection:redis as any,
    
    
})