import * as nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string, html?: string, pdfFilePath?: string) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', 
    port: 587, 
    secure: false,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  // Set up email data
  const mailOptions: nodemailer.SendMailOptions = {
    from: '"Your Name" <your-email@example.com>', // Replace with your name and email
    to,
    subject,
    text,
    html, // Optional: HTML version of the message
    attachments: pdfFilePath ? [
      {
        filename: 'attachment.pdf', // You can customize the filename
        path: pdfFilePath, // Path to the PDF file
        contentType: 'application/pdf'
      }
    ] : []
  };

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return {
      code: 200,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email: %s', error);
    return {
      code: 500,
      message: 'Failed to send email',
    };
  }
}