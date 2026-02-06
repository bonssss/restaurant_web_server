import schedule, { scheduleJob } from "node-schedule";
import { sendMail } from "./mailer.js";
import { campaignMail } from "../mailTemplates.js";
export const schedules  = (timeOptions)=>{
   schedule.scheduleJob(timeOptions,async()=>{
        // console.log("Tme to send email");
        sendMail("arifpay04@gmail.com", campaignMail("Special Promotion", "promo1", "arifpay04@gmail.com"));
        console.log("Email sent");
        

        
    })
}