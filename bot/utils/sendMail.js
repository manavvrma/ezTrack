import nodemailer from "nodemailer";

const sendMail = (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: `"${process.env.EMAIL_SENDER}" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html: message,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info);
    }
  });
};

export default sendMail;
