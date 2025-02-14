const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { PPTS, WebS, CodingS, QuizS } = require('../Tech_models/Tech');

// Configure the Nodemailer transporter with hardcoded credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davidshalomswe@gmail.com',
    pass: 'qvmcuzfpdwyxrbuu'  // App password (ensure this is kept secure)
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
  const existingUser =
    (await PPTS.findOne({ Email: email })) ||
    (await WebS.findOne({ Email: email })) ||
    (await CodingS.findOne({ Email: email })) ||
    (await QuizS.findOne({ Email: email }));

  return existingUser;
}

// Function to handle registration with duplicate check across all events
async function createDocument(req, res, Model, subject, message) {
  try {
    const { Name, Email, Phone_No, College } = req.body;

    // Check if the user has already registered for any event
    if (await isUserAlreadyRegistered(Email)) {
      return res.status(400).json({ message: "You have already registered for an event. Multiple registrations are not allowed." });
    }

    // Save new registration
    const newData = new Model({ Name, Email, Phone_No, College });
    await newData.save();

    // Send confirmation email
    await sendMail(Email, subject, message);

    return res.status(200).json({ message: "Registration successful! A confirmation email has been sent." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Event registration routes
router.post('/ppt', async (req, res) => {
  await createDocument(req, res, PPTS, "PPT Registration", "Thank you for registering for the PPT event! See you at POINTER'S 2K25!");
});

router.post('/web', async (req, res) => {
  await createDocument(req, res, WebS, "Web Development Registration", "Thank you for registering for the Web Development event! See you at POINTER'S 2K25!");
});

router.post('/code', async (req, res) => {
  await createDocument(req, res, CodingS, "Coding Competition Registration", "Thank you for registering for the Coding Competition! See you at POINTER'S 2K25!");
});

router.post('/quiz', async (req, res) => {
  await createDocument(req, res, QuizS, "Quiz Competition Registration", "Thank you for registering for the Quiz Competition! See you at POINTER'S 2K25!");
});

module.exports = router;
