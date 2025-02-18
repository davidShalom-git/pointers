const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { PPTS, WebS, CodingS, QuizS } = require('../Tech_models/Tech');
// Import credentials from config

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davidshalomswe@gmail.com',
    pass: 'qvmcuzfpdwyxrbuu'
  }
});

// Function to send an email
const sendMail = (recipient, subject, message) => {
  const mailOptions = {
    from: 'davidshalomswe@gmail.com',
    to: recipient,
    subject: subject,
    text: message
  };

  return transporter.sendMail(mailOptions);
};

// Function to check if a user exists in any event collection
async function isUserAlreadyRegistered(email) {
  return (
    (await PPTS.findOne({ Email: email })) ||
    (await WebS.findOne({ Email: email })) ||
    (await CodingS.findOne({ Email: email })) ||
    (await QuizS.findOne({ Email: email }))
  );
}

// Function to handle registration with duplicate check
async function createDocument(req, res, Model, subject, message) {
  try {
    const { Name, Email, Phone_No, College, With_Accomadation, Without_Accomadation } = req.body;

    // Check if user already registered
    if (await isUserAlreadyRegistered(Email)) {
      return res.status(400).json({ message: "You have already registered for an event." });
    }

    // Save registration
    const newData = new Model({ Name, Email, Phone_No, College, With_Accomadation, Without_Accomadation });
    await newData.save();

    // Send confirmation email
    await sendMail(Email, subject, message);

    return res.status(200).json({ message: "Registration successful! Confirmation email sent." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Event registration routes
router.post('/ppt', (req, res) => createDocument(req, res, PPTS, "PPT Registration", "Thank you for registering for the PPT event!"));
router.post('/web', (req, res) => createDocument(req, res, WebS, "Web Dev Registration", "Thank you for registering for Web Dev!"));
router.post('/code', (req, res) => createDocument(req, res, CodingS, "Coding Competition", "Thank you for registering for Coding!"));
router.post('/quiz', (req, res) => createDocument(req, res, QuizS, "Quiz Competition", "Thank you for registering for the Quiz Competition!"));

module.exports = router;
