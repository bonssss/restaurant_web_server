import fastify from "fastify";
import formbody from "@fastify/formbody";
import { sendMail } from "./services/mailer.js";
import { welcomeMail } from "./mailTemplates.js";
import Lead from "./models/mailer.js";
import dotenv from "dotenv";
dotenv.config();


const app = fastify();
app.register(formbody);

app.post("/subscribe",  async (request, reply) => {
    const { email } = request.body;
    console.log(`New subscription reciver : ${email}`);
    try {
    await Lead.create({ email });
    await sendMail(email, welcomeMail(email));
    reply.send({ message: "Subscription successful!" });
    } catch (e) {
        console.error(`Error processing subscription: ${e.message}`);
        reply.status(500).send({ error: "An error occurred while processing your subscription." });
    }
});


const port = process.env.PORT || 3000;
 try {
    await app.listen({ port });
    console.log(`Server is running on port ${port}`);
} catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
}