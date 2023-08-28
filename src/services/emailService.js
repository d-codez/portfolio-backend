const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs/promises');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const loadTemplate = async (templatePath) => {
  try {
    const template = await fs.readFile(templatePath, 'utf-8');
    return handlebars.compile(template);
  } catch (error) {
    console.error('Error loading template:', error);
    throw error;
  }
};

const sendEmail = async (recipient, subject, templatePath, data) => {
  try {
    const compiledTemplate = await loadTemplate(templatePath);
    const html = compiledTemplate(data);

    const mailOptions = {
      from: '"Support Team" <no-reply@dhruvprajapti.com>',
      to: recipient,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendConfirmationEmail = async (recipient) => {
  try {
    await sendEmail(recipient, 'Form Submission Confirmation', 'src/views/emails/confirmation.hbs', {});
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

const sendNotificationEmail = async (formData) => {
  try {
    await sendEmail('thebrandnewacc1110@gmail.com', 'New Form Submission', 'src/views/emails/notification.hbs', formData);
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
};

module.exports = { sendConfirmationEmail, sendNotificationEmail };
