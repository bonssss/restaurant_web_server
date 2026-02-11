import fastify from "fastify";
import formbody from "@fastify/formbody";
import { sendMail } from "./services/mailer.js";
import { welcomeMail } from "./mailTemplates.js";
import { confirmationMail } from "./mailTemplates.js";
import { campaignMail } from "./mailTemplates.js";
import Lead from "./models/mailer.js";
import { schedules } from "./services/scheduler.js";
import dotenv from "dotenv";
dotenv.config();

schedules({seconds: 30});

const app = fastify();
app.register(formbody);
// const leads = await Lead.findAll();
// console.log(leads);                                   


app.post("/subscribe",  async (request, reply) => {
    const { email } = request.body;
    console.log(`New subscription reciver : ${email}`);
    try {
    await Lead.create({ email });
    await sendMail(email, confirmationMail(email));
    reply.send({ message: "Subscription successful!" });
    } catch (e) {
        console.error(`Error processing subscription: ${e.message}`);
        reply.status(500).send({ error: "An error occurred while processing your subscription." });
    }
});

app.get("/verify/:email", async (request, reply) => {
    const { email } = request.params;
   
    
    console.log(`Verification request for : ${email}`);
    try {
        const lead = await Lead.findOne({ where: { email } });
        if (!lead) {
            reply.status(404).send({ error: "Lead not found." });
            return;
        }
        lead.verified = true;
        await lead.save();
        reply.send({ message: "Email verified successfully!" });
    }catch (e) {
        console.error(`Error verifying email: ${e.message}`);
        reply.status(500).send({ error: "An error occurred while verifying the email." });
    }
});

app.get("/campaign/:campaignKey/user/:email/image.png", async (request, reply) => { 
  const { email, campaignKey } = request.params; 
  try {
    const lead = await Lead.findOne({ where: { email } }); 
    if (lead) {
      lead.lastCampaign = campaignKey; 
      await lead.save();
      console.log(`${email} opened ${campaignKey}`); 
    }
  } catch (e) {
    console.log("An error occurred", e.message);
  }
  reply.send({ message: "ok" }); 
});


sendMail("arifpay04@gmail.com", campaignMail("Special Promotion", "promo1", "arifpay04@gmail.com"))


const port = process.env.PORT || 3000;
 try {
    await app.listen({ port });
    console.log(`Server is running on port ${port}`);
} catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
}