import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: "Hello from Node.js",
html :
`<html>
  <body>
      <h1>
      Confirm your email
      </h1>
  </body>
</html>`
};

export const sendMail = async (to, html) => { 1
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject: "Email from Inn Box!",
    html,
  };
  try { 
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (e) {
    console.log(`An error occurred: ${e.message}`);
  }
};

// sendMail();