const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (toEmail, username, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Welcome to our marketplace!',
    text: `Hello ${username},\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

module.exports = { sendConfirmationEmail };
