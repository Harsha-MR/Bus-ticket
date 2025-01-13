import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to, // Recipient address
      subject,
      text, // Plain text body
      html, // HTML body (optional)
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
