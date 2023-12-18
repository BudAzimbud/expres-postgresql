import nodemailer from "nodemailer";
import Mailgen from "mailgen";
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0e21efb8856c06",
    pass: "fc934fe77268fa",
  },
});

const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Tavia",
    link: "https://mailgen.js/",
  },
});



export function sendEmail({ to, name, instructions, text, link }){
  const email = {
    body: {
      name: name,
      action: {
        instructions: instructions,
        button: {
          color: "#22BC66", // Optional action button color
          text,
          link,
        },
      },
    },
  };
  const emailBody = MailGenerator.generate(email);
  
  const mailOptions = {
    from: "noreplay@gmail.com",
    to: to,
    subject: instructions,
    html: emailBody,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
  
}


