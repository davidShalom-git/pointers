const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { PPTS, WebS, CodingS, QuizS } = require('../Tech_models/Tech');

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
  const registrations = await Promise.all([
    PPTS.find({ Email: email }),
    WebS.find({ Email: email }),
    CodingS.find({ Email: email }),
    QuizS.find({ Email: email })
  ]);

  const totalRegistrations = registrations.flat().length;

  return totalRegistrations >= 2;
}

// Function to check if a user is already registered for the same event
async function isUserRegisteredForSameEvent(email, Model) {
  const existingRegistration = await Model.findOne({ Email: email });
  return !!existingRegistration;
}

// Function to handle registration with duplicate check
async function createDocument(req, res, Model, subject, message) {
  try {
    const { Name, Email, Phone_No, College, With_Accomadation, Without_Accomadation } = req.body;

    // Check if user already registered for two events
    if (await isUserAlreadyRegistered(Email)) {
      return res.status(400).json({ message: "You can only register for up to two technical events." });
    }

    // Check if user already registered for the same event
    if (await isUserRegisteredForSameEvent(Email, Model)) {
      return res.status(400).json({ message: "You are already registered for this event." });
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
