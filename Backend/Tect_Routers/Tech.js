const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { PPTS, WebS, CodingS, QuizS } = require('../Tech_models/Tech');
require('dotenv').config(); // Import environment variables (if needed)

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davidshalomswe@gmail.com',
    pass: 'qvmc uzfp dwyx rbuu' // Your App Password
  }
});

// Function to send an email
const sendMail = (recipient, subject, message, res) => {
  const mailOptions = {
    from: 'davidshalomswe@gmail.com',
    to: recipient,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error: ', error);
      return res.status(500).send('Error: ' + error);
    }
    console.log('Message sent: ', info.messageId);
    return res.status(200).send('Message sent: ' + info.messageId);
  });
};

// Route to add a new document without payment integration
async function createDocument(req, res, Model, subject, message) {
  try {
    const newData = new Model({
      Name: req.body.Name,
      Email: req.body.Email,
      Phone_No: req.body.Phone_No,
      College: req.body.College // Assuming payment is not required
    });

    await newData.save();

    sendMail(req.body.Email, subject, message, res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Routes for creating documents with email notification
router.post('/ppt', async (req, res) => {
  const subject = "PPT Registration";
  const message = `Thank you for registering for the PPT event! We’re thrilled to confirm that your registration has been completed. We truly appreciate your participation and can’t wait to welcome you.
Please mark your calendar, as the event is fast approaching. We’re excited to meet you and ensure you have a fantastic experience. Feel free to reach out if you have any questions or need further assistance.
Looking forward to seeing you at POINTER'S 2K25!`;
  await createDocument(req, res, PPTS, subject, message);
});

router.post('/web', async (req, res) => {
  const subject = "Web Development Registration";
  const message = `Thank you for registering for the Web Development event! We’re thrilled to confirm that your registration has been completed. We truly appreciate your participation and can’t wait to welcome you.
Please mark your calendar, as the event is fast approaching. We’re excited to meet you and ensure you have a fantastic experience. Feel free to reach out if you have any questions or need further assistance.
Looking forward to seeing you at POINTER'S 2K25!`;
  await createDocument(req, res, WebS, subject, message);
});

router.post('/code', async (req, res) => {
  const subject = "Coding Competition Registration";
  const message = `Thank you for registering for the Coding Competition! We’re thrilled to confirm that your registration has been completed. We truly appreciate your participation and can’t wait to welcome you.
Please mark your calendar, as the event is fast approaching. We’re excited to meet you and ensure you have a fantastic experience. Feel free to reach out if you have any questions or need further assistance.
Looking forward to seeing you at POINTER'S 2K25!`;
  await createDocument(req, res, CodingS, subject, message);
});

router.post('/quiz', async (req, res) => {
  const subject = "Quiz Competition Registration";
  const message = `Thank you for registering for the Quiz Competition! We’re thrilled to confirm that your registration has been completed. We truly appreciate your participation and can’t wait to welcome you.
Please mark your calendar, as the event is fast approaching. We’re excited to meet you and ensure you have a fantastic experience. Feel free to reach out if you have any questions or need further assistance.
Looking forward to seeing you at POINTER'S 2K25!`;
  await createDocument(req, res, QuizS, subject, message);
});

module.exports = router;
