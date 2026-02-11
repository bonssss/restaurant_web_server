import schedule, { scheduleJob } from "node-schedule";
import dotenv from "dotenv";
dotenv.config();
import { sendMail } from "./mailer.js";
import { campaignMail } from "../mailTemplates.js";
export const schedules  = (timeOptions)=>{
   schedule.scheduleJob(timeOptions,async()=>{
        // console.log("Tme to send email");
        sendMail(process.env.RECEIVER_EMAIL, campaignMail("Special Promotion", "promo1", process.env.SENDER_EMAIL));
        console.log("Email sent");
        

        
    })
}