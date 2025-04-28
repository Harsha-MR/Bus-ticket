// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail", // Use your email service provider
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address
//     pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//   },
// });

// export const sendEmail = async (to, subject, text, html) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // Sender address
//       to, // Recipient address
//       subject,
//       text, // Plain text body
//       html, // HTML body (optional)
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

import nodemailer from "nodemailer";

// Configure the transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

export const sendTicketEmail = async (email, emailSubject, emailText, emailHtml, filePath,b_id) => {

  try {
    // Use the req.user.email for the recipient's address
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Use environment variable directly
      to: email, // Recipient's email address
      subject: emailSubject,
      text: emailText,
      html:emailHtml,
      attachments: [
        {
          filename: `ticket-${b_id}.pdf`,
          path: filePath,
        },
      ],
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

 export const sendEmail = async (userEmail, emailSubject, emailText, emailHtml) => {
  try {
     const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to:userEmail,
      subject:emailSubject,
      text:emailText,// Plain text body
      html:emailHtml // HTML body (optional)
    };
  
     await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail}`);
   } catch (error) {
     console.error("Error sending email:", error);
   }
};

