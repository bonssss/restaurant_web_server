import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: "bons6710hos@gmail.com",
        pass: "bhdy ulkw hqay viue"
    }
});

const mailOptions = {
    from: "bons6710hos@gmail.com",
    to: "arifpay04@gmail.com",
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


const sendMail = async () => {
    try{
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    }catch(error){
        console.log("Error sending email: " + error);
    }
};

sendMail();