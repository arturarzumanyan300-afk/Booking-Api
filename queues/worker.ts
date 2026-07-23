import { Worker } from "bullmq";
import { redis } from "../modules/config/redis";
import { sendEmailJob } from "./jobs/email.jobs";
console.log("OK");

export const worker=new Worker("email",async(job)=>{
    if(job.name==="sendEmail"){
        await sendEmailJob(job.data)
    }
},{connection:redis as any})