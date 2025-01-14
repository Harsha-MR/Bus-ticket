// import PDFDocument from "pdfkit";
// import fs from "fs";

// export const generateTicketPDF = (bookingDetails) => {
//   const {
//     userName,
//     userEmail,
//     busName,
//     busRegNumber,
//     from,
//     to,
//     seatNumbers,
//     journeyStartTime,
//     journeyEndTime,
//     ticketId,
//   } = bookingDetails;

//   // PDF Document
//   const doc = new PDFDocument();

//   // File Path
//   const filePath = `tickets/ticket-${ticketId}.pdf`;

//   // Pipe the PDF to a file
//   doc.pipe(fs.createWriteStream(filePath));

//   // Add content to PDF
//   doc.fontSize(20).text("Digital Ticket", { align: "center" }).moveDown(1);

//   doc.fontSize(14).text(`Name: ${userName}`);
//   doc.text(`Email: ${userEmail}`);
//   doc.text(`Ticket ID: ${ticketId}`);
//   doc.text(`Bus Name: ${busName}`);
//   doc.text(`Bus Registration Number: ${busRegNumber}`);
//   doc.text(`From: ${from}`);
//   doc.text(`To: ${to}`);
//   doc.text(`Seats: ${seatNumbers.join(", ")}`);
//   doc.text(`Journey Start Time: ${new Date(journeyStartTime).toLocaleString()}`);
//   doc.text(`Journey End Time: ${new Date(journeyEndTime).toLocaleString()}`);

//   // Add footer
//   doc.moveDown(2).fontSize(10).text("Thank you for booking with us!", {
//     align: "center",
//   });

//   // Finalize the document
//   doc.end();

//   return filePath;
// };
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit'; 
export const generateTicketPDF = ({
  userName,
  userEmail,
  busName,
  busRegNumber,
  from,
  to,
  seatNumbers,
  journeyStartTime,
  journeyEndTime,
  ticketId,
}) => {
  const ticketsDir = path.resolve(process.cwd(), 'tickets'); // Path to tickets folder
  const fileName = `ticket_${ticketId}.pdf`;
  const filePath = path.join(ticketsDir, fileName);

  // Ensure the tickets directory exists
  if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir, { recursive: true });
  }

  // Generate the PDF
  const pdf = new PDFDocument();
  pdf.pipe(fs.createWriteStream(filePath));
  pdf.fontSize(16).text(`Booking Confirmation for ${userName}`, { align: 'center' });
  pdf.text(`Email: ${userEmail}`);
  pdf.text(`Bus: ${busName} (${busRegNumber})`);
  pdf.text(`From: ${from} To: ${to}`);
  pdf.text(`Seats: ${seatNumbers.join(', ')}`);
  pdf.text(`Start Time: ${journeyStartTime}`);
  pdf.text(`End Time: ${journeyEndTime}`);
  pdf.text(`Ticket ID: ${ticketId}`);
  pdf.end();

  return filePath; // Return the generated file's path
};